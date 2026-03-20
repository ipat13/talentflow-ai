import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { name, email, company, message } = data;
    
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "hello@talentsflow.ai";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      
      await resend.emails.send({
        from: "TalentsFlow.ai <noreply@talentsflow.ai>",
        to: contactEmail,
        subject: `New Contact: ${name} from ${company}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00D2FF;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.role || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hiring Needs:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.hiringNeeds || "Not provided"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
              <strong>Message:</strong>
              <p style="margin: 10px 0;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Submitted: ${new Date().toISOString()}
            </p>
          </div>
        `,
      });

      return NextResponse.json(
        { success: true, message: "Form submitted successfully" },
        { status: 200 }
      );
    }

    console.log("Contact form submission (no email configured):", {
      name,
      email,
      company,
      role: data.role || "Not provided",
      message,
      hiringNeeds: data.hiringNeeds || "Not provided",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
