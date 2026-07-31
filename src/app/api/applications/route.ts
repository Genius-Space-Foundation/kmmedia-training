import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      // Shared
      name, email, phone, dob, pob, 
      nationality, hometown, religion, 
      gender, maritalStatus, occupation, 
      address, course, category, reference,
      guardianName, guardianPhone, guardianOccupation, guardianRelationship,
      educationLevel, previousSchool, completionYear,
      hostelFacility,
      
      // Tech Only
      emergencyContactName, emergencyContactPhone, learningObjectives,
      techExperience, techExperienceDesc, preferredMode, preferredSchedule,

      // Robotics Only
      age, altPhone, programInterest, medicalCondition, medicalConditionDesc,
      emergencyContactRelationship, roboticsSchedule
    } = body;

    // Basic validation
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isTech = category === "Tech Programmes" && course !== "Robotics for Kids";
    const isRobotics = course === "Robotics for Kids";

    let emailHtml = "";

    if (isRobotics) {
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0994c4; border-bottom: 2px solid #0994c4; padding-bottom: 10px;">New Application: ${course}</h2>
          
          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Child Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Child's Full Name</td><td style="padding: 10px;">${name}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Date of Birth</td><td style="padding: 10px;">${dob}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Age</td><td style="padding: 10px;">${age}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Gender</td><td style="padding: 10px;">${gender}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">School Name</td><td style="padding: 10px;">${previousSchool}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Current Class/Grade</td><td style="padding: 10px;">${educationLevel}</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Parent/Guardian Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Full Name</td><td style="padding: 10px;">${guardianName}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Relationship to Child</td><td style="padding: 10px;">${guardianRelationship}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Phone Number</td><td style="padding: 10px;">${phone}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Alternative Phone</td><td style="padding: 10px;">${altPhone || "N/A"}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Email Address</td><td style="padding: 10px;">${email}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Residential Address</td><td style="padding: 10px;">${address}</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Program Interest</h3>
          <p style="padding: 10px; margin: 0;"><strong>Reason:</strong> ${programInterest}</p>
          ${programInterest === 'Other' ? `<p style="padding: 10px; margin: 0; background-color: #f9f9f9; border-radius: 5px;">${learningObjectives}</p>` : ''}

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Child Background</h3>
          <p style="padding: 10px; margin: 0;"><strong>Previous STEM Program:</strong> ${techExperience}</p>
          ${techExperience === 'Yes' ? `<p style="padding: 10px; margin: 0; background-color: #f9f9f9; border-radius: 5px;">${techExperienceDesc}</p>` : ''}

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Medical & Special Needs</h3>
          <p style="padding: 10px; margin: 0;"><strong>Any Medical Conditions/Special Needs:</strong> ${medicalCondition}</p>
          ${medicalCondition === 'Yes' ? `<p style="padding: 10px; margin: 0; background-color: #f9f9f9; border-radius: 5px;">${medicalConditionDesc}</p>` : ''}

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Emergency Contact</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Name</td><td style="padding: 10px;">${emergencyContactName}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Relationship</td><td style="padding: 10px;">${emergencyContactRelationship}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Phone</td><td style="padding: 10px;">${emergencyContactPhone}</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Training Schedule</h3>
          <p style="padding: 10px; margin: 0;"><strong>Preferred Schedule:</strong> ${roboticsSchedule}</p>

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
      `;
    } else if (isTech) {
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0994c4; border-bottom: 2px solid #0994c4; padding-bottom: 10px;">New Tech Application: ${course}</h2>
          
          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Applicant Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Full Name</td><td style="padding: 10px;">${name}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Date of Birth</td><td style="padding: 10px;">${dob}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Gender</td><td style="padding: 10px;">${gender}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Phone Number</td><td style="padding: 10px;">${phone}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Email Address</td><td style="padding: 10px;">${email}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Residential Address</td><td style="padding: 10px;">${address}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">City/Town</td><td style="padding: 10px;">${hometown}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Highest Education</td><td style="padding: 10px;">${educationLevel}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Occupation</td><td style="padding: 10px;">${occupation}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Emergency Contact</td><td style="padding: 10px;">${emergencyContactName} (${emergencyContactPhone})</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Course Selection</h3>
          <p style="padding: 10px; margin: 0;"><strong>${course}</strong></p>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Learning Objectives</h3>
          <p style="padding: 10px; margin: 0; background-color: #f9f9f9; border-radius: 5px;">${learningObjectives}</p>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Technology Experience</h3>
          <p style="padding: 10px; margin: 0;"><strong>Prior Experience:</strong> ${techExperience}</p>
          ${techExperience === 'Yes' ? `<p style="padding: 10px; margin: 0; background-color: #f9f9f9; border-radius: 5px;">${techExperienceDesc}</p>` : ''}

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Training Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Preferred Mode</td><td style="padding: 10px;">${preferredMode}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Preferred Schedule</td><td style="padding: 10px;">${preferredSchedule}</td></tr>
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
      `;
    } else {
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0994c4; border-bottom: 2px solid #0994c4; padding-bottom: 10px;">New Media Application: ${course}</h2>
          
          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Student Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Full Name</td><td style="padding: 10px;">${name}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Email</td><td style="padding: 10px;">${email}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Phone</td><td style="padding: 10px;">${phone}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Date of Birth</td><td style="padding: 10px;">${dob}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Place of Birth</td><td style="padding: 10px;">${pob}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Nationality</td><td style="padding: 10px;">${nationality}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Hometown</td><td style="padding: 10px;">${hometown}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Religion</td><td style="padding: 10px;">${religion}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Gender</td><td style="padding: 10px;">${gender}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Marital Status</td><td style="padding: 10px;">${maritalStatus}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Occupation</td><td style="padding: 10px;">${occupation}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Address</td><td style="padding: 10px;">${address}</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Education Background</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Level of Education</td><td style="padding: 10px;">${educationLevel}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Previous School</td><td style="padding: 10px;">${previousSchool}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Year of Completion</td><td style="padding: 10px;">${completionYear}</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Accommodation</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Hostel Facility Required</td><td style="padding: 10px;">${hostelFacility}</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Parent / Guardian Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; color: #555;">Guardian Name</td><td style="padding: 10px;">${guardianName}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Guardian Phone</td><td style="padding: 10px;">${guardianPhone}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Guardian Occupation</td><td style="padding: 10px;">${guardianOccupation}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; color: #555;">Relationship</td><td style="padding: 10px;">${guardianRelationship}</td></tr>
          </table>

          <h3 style="color: #444; margin-top: 25px; border-left: 4px solid #0994c4; padding-left: 10px;">Payment Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">Payment Reference</td><td style="padding: 10px; font-family: monospace;">${reference}</td></tr>
          </table>
          <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            <p>This application was submitted via the KM Media Training Institute landing page.</p>
          </div>
        </div>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: "KM Media Admissions <admissions@kmmediatraininginstitute.com>",
      to: process.env.ADMIN_EMAIL || "kmradioonline2@gmail.com",
      subject: `New Application: ${name} - ${course}`,
      html: emailHtml
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
