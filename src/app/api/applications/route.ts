import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, phone, dob, pob, 
      nationality, hometown, religion, 
      gender, maritalStatus, occupation, 
      address, course, reference,
      guardianName, guardianPhone, guardianOccupation, guardianRelationship,
      educationLevel, previousSchool, completionYear
    } = body;

    // Basic validation
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "KM Media Admissions <admissions@kmmediatraininginstitute.com>",
      to: process.env.ADMIN_EMAIL || "kmradioonline2@gmail.com",
      subject: `New Application: ${name} - ${course}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0994c4; border-bottom: 2px solid #0994c4; padding-bottom: 10px;">New Student Application</h2>
          
          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Student Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">Full Name</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Programme</td>
              <td style="padding: 10px;">${course}</td>
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
              <td style="padding: 10px; font-weight: bold; color: #555;">Date of Birth</td>
              <td style="padding: 10px;">${dob}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Place of Birth</td>
              <td style="padding: 10px;">${pob}</td>
            </tr>
             <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Nationality</td>
              <td style="padding: 10px;">${nationality}</td>
            </tr>
             <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Hometown</td>
              <td style="padding: 10px;">${hometown}</td>
            </tr>
             <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Religion</td>
              <td style="padding: 10px;">${religion}</td>
            </tr>
             <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Gender</td>
              <td style="padding: 10px;">${gender}</td>
            </tr>
             <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Marital Status</td>
              <td style="padding: 10px;">${maritalStatus}</td>
            </tr>
             <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Occupation</td>
              <td style="padding: 10px;">${occupation}</td>
            </tr>
             <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Address</td>
              <td style="padding: 10px;">${address}</td>
            </tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Education Background</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">Level of Education</td>
              <td style="padding: 10px;">${educationLevel}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Previous School</td>
              <td style="padding: 10px;">${previousSchool}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Year of Completion</td>
              <td style="padding: 10px;">${completionYear}</td>
            </tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Parent / Guardian Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">Guardian Name</td>
              <td style="padding: 10px;">${guardianName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Guardian Phone</td>
              <td style="padding: 10px;">${guardianPhone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Guardian Occupation</td>
              <td style="padding: 10px;">${guardianOccupation}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Relationship</td>
              <td style="padding: 10px;">${guardianRelationship}</td>
            </tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Payment Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">Payment Reference</td>
              <td style="padding: 10px; font-family: monospace;">${reference}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            <p>This application was submitted via the KM Media Training Institute landing page.</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
