import { NextResponse } from "next/server";
import { Resend } from "resend";
import { programmes } from "@/data/courses";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory session store (Note: For production, use Redis or a database)
const sessions = new Map<string, any>();

type HubtelRequest = {
  SessionId: string;
  Mobile: string;
  ServiceCode: string;
  Type: "Initiation" | "Response" | "Release" | "Timeout";
  Message: string;
  Operator: string;
  Sequence: number;
};

type HubtelResponse = {
  Message: string;
  Type: "Response" | "Release";
};

export async function POST(req: Request) {
  try {
    const body: HubtelRequest = await req.json();
    const { SessionId, Mobile, Type, Message } = body;

    if (Type === "Timeout" || Type === "Release") {
      sessions.delete(SessionId);
      return NextResponse.json({ Message: "Session ended", Type: "Release" });
    }

    let session = sessions.get(SessionId) || { step: "WELCOME", data: {} };

    // Update session step based on user response
    let response: HubtelResponse;

    switch (session.step) {
      case "WELCOME":
        session.step = "SELECT_PROGRAMME";
        sessions.set(SessionId, session);
        response = {
          Message: "Welcome to KM Media Training Institute.\nSelect a Programme:\n1. Media\n2. Fashion\n3. IT\n4. Design",
          Type: "Response",
        };
        break;

      case "SELECT_PROGRAMME":
        const categories = ["Media", "Fashion", "IT", "Design"];
        const catIdx = parseInt(Message) - 1;
        if (categories[catIdx]) {
          session.data.category = categories[catIdx];
          const filtered = programmes.filter(p => p.category === categories[catIdx]);
          session.step = "CHOOSE_COURSE";
          session.data.filtered = filtered;
          sessions.set(SessionId, session);
          
          let msg = `Select ${categories[catIdx]} Course:\n`;
          filtered.forEach((p, i) => {
            msg += `${i + 1}. ${p.title}\n`;
          });
          response = { Message: msg, Type: "Response" };
        } else {
          response = { Message: "Invalid choice.\n1. Media\n2. Fashion\n3. IT\n4. Design", Type: "Response" };
        }
        break;

      case "CHOOSE_COURSE":
        const courseIdx = parseInt(Message) - 1;
        const selected = session.data.filtered[courseIdx];
        if (selected) {
          session.data.programme = selected.title;
          session.step = "ENTER_NAME";
          sessions.set(SessionId, session);
          response = { Message: "Enter your Full Name:", Type: "Response" };
        } else {
          response = { Message: "Invalid choice. Please select from the list.", Type: "Response" };
        }
        break;

      case "ENTER_NAME":
        session.data.name = Message;
        session.step = "ENTER_EMAIL";
        sessions.set(SessionId, session);
        response = { Message: "Enter your Email Address:", Type: "Response" };
        break;

      case "ENTER_EMAIL":
        session.data.email = Message;
        session.step = "SELECT_GENDER";
        sessions.set(SessionId, session);
        response = { Message: "Select Gender:\n1. Male\n2. Female", Type: "Response" };
        break;

      case "SELECT_GENDER":
        const genders = ["Male", "Female"];
        const gIdx = parseInt(Message) - 1;
        if (genders[gIdx]) {
          session.data.gender = genders[gIdx];
          session.step = "SELECT_MARITAL_STATUS";
          sessions.set(SessionId, session);
          response = { Message: "Marital Status:\n1. Single\n2. Married\n3. Other", Type: "Response" };
        } else {
          response = { Message: "Invalid choice.\n1. Male\n2. Female", Type: "Response" };
        }
        break;

      case "SELECT_MARITAL_STATUS":
        const statuses = ["Single", "Married", "Other"];
        const sIdx = parseInt(Message) - 1;
        if (statuses[sIdx]) {
          session.data.maritalStatus = statuses[sIdx];
          session.step = "CONFIRM_PAYMENT";
          sessions.set(SessionId, session);
          response = { 
            Message: `Apply for ${session.data.programme}?\nApplication Fee: GHS 100.00\n1. Pay Now via MoMo\n2. Cancel`, 
            Type: "Response" 
          };
        } else {
          response = { Message: "Invalid choice.\n1. Single\n2. Married\n3. Other", Type: "Response" };
        }
        break;

      case "CONFIRM_PAYMENT":
        if (Message === "1") {
          session.step = "FINALIZING";
          sessions.set(SessionId, session);
          
          // Trigger Paystack STK Push (Requires PAYSTACK_SECRET_KEY)
          const paymentResult = await initiatePaystackMomo(Mobile, session.data.email);
          
          // Submit application details as in web version
          const submissionSuccess = await submitApplication({
            ...session.data,
            phone: Mobile,
            reference: paymentResult.reference || `USSD-${SessionId.substring(0, 8)}`,
          });

          if (submissionSuccess) {
              response = { 
                Message: paymentResult.success 
                  ? "Registration submitted! Check your phone for the GHS 100 payment prompt. Thank you for choosing KM Media." 
                  : "Registration submitted! Please pay the GHS 100 application fee via Mobile Money to complete enrollment. Thank you.", 
                Type: "Release" 
              };
          } else {
              response = { Message: "Error submitting application. Please try again later.", Type: "Release" };
          }
          sessions.delete(SessionId);
        } else {
          sessions.delete(SessionId);
          response = { Message: "Application cancelled.", Type: "Release" };
        }
        break;

      default:
        response = { Message: "Error: Unknown step.", Type: "Release" };
        sessions.delete(SessionId);
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error("USSD Error:", error);
    return NextResponse.json({ Message: "An error occurred. Please try again.", Type: "Release" });
  }
}

async function submitApplication(data: any) {
    try {
        const { name, email, phone, programme, gender, maritalStatus, reference } = data;
        
        const { error } = await resend.emails.send({
            from: "KM Media Admissions <admissions@kmmediatraininginstitute.com>",
            to: process.env.ADMIN_EMAIL || "kmradioonline2@gmail.com",
            subject: `New USSD Application: ${name} - ${programme}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #0994c4; border-bottom: 2px solid #0994c4; padding-bottom: 10px;">New Student Application (USSD)</h2>
                
                <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Student Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">Full Name</td>
                    <td style="padding: 10px;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; font-weight: bold; color: #555;">Programme</td>
                    <td style="padding: 10px;">${programme}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; font-weight: bold; color: #555;">Email</td>
                    <td style="padding: 10px;">${email}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; font-weight: bold; color: #555;">Phone</td>
                    <td style="padding: 10px;">${phone}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; font-weight: bold; color: #555;">Gender</td>
                    <td style="padding: 10px;">${gender}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; font-weight: bold; color: #555;">Marital Status</td>
                    <td style="padding: 10px;">${maritalStatus}</td>
                  </tr>
                </table>
      
                <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
                  <p>This application was submitted via the KM Media Hubtel USSD interface.</p>
                  <p>Reference: ${reference}</p>
                </div>
              </div>
            `
          });
          
          if (error) {
              console.error("Resend Error in USSD:", error);
              return false;
          }
          return true;
    } catch (e) {
        console.error("Submission Error in USSD:", e);
        return false;
    }
}

async function initiatePaystackMomo(phone: string, email: string) {
    try {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            console.warn("Paystack Secret Key is missing. Skipping STK push.");
            return { success: false };
        }

        const cleanPhone = phone.startsWith("233") ? phone : `233${phone.replace(/^0/, "")}`;
        
        const response = await fetch("https://api.paystack.co/charge", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                amount: 10000, // 100 GHS in pesewas
                currency: "GHS",
                mobile_money: {
                    phone: cleanPhone,
                    provider: detectProvider(cleanPhone),
                }
            }),
        });

        const result = await response.json();
        
        if (result.status && result.data) {
            return { 
                success: true, 
                reference: result.data.reference 
            };
        }
        
        console.error("Paystack Charge Error:", result);
        return { success: false };
    } catch (e) {
        console.error("Paystack Integration Error:", e);
        return { success: false };
    }
}

function detectProvider(phone: string) {
    if (phone.match(/^233(24|54|55|59|25|53)/)) return "mtn";
    if (phone.match(/^233(20|50)/)) return "vod";
    if (phone.match(/^233(27|57|26|56)/)) return "tgo";
    return "mtn"; // Default to mtn if unable to detect
}
