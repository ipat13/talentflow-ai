import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { name, email, company, message } = data;
    
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Here you would integrate with an email service like:
    // - SendGrid
    // - Resend
    // - AWS SES
    // - Nodemailer with SMTP
    
    // For now, log the submission
    console.log("Contact form submission:", {
      name,
      email,
      company,
      role: data.role || "Not provided",
      message,
      hiringNeeds: data.hiringNeeds || "Not provided",
      timestamp: new Date().toISOString(),
    });

    // Example: Send to Resend (uncomment and configure)
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "hello@talentsflow.ai",
      subject: `New Contact: ${name} from ${company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Role:</strong> ${data.role || "Not provided"}</p>
        <p><strong>Hiring Needs:</strong> ${data.hiringNeeds || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    */

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
