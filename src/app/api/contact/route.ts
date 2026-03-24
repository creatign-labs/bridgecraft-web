import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Create a write-capable Sanity client for storing submissions.
 * Requires SANITY_API_TOKEN with write permissions.
 */
function getSanityWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || projectId === 'your_project_id' || !token) return null;

  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
  });
}

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = (await request.json()) as ContactPayload;

    // Validate required fields
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required.' },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_EMAIL;
    if (!to) {
      console.error('CONTACT_EMAIL env variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 },
      );
    }

    // Store the lead in Sanity (non-blocking — email still sends if this fails)
    const sanityClient = getSanityWriteClient();
    if (sanityClient) {
      try {
        await sanityClient.create({
          _type: 'contactSubmission',
          name: name.trim(),
          email: email.trim(),
          phone: body.phone?.trim() || undefined,
          subject: subject.trim(),
          message: message.trim(),
          submittedAt: new Date().toISOString(),
          status: 'new',
        });
      } catch (sanityErr) {
        // Log but don't block the email from being sent
        console.error('Failed to store lead in Sanity:', sanityErr);
      }
    }

    const { error } = await resend.emails.send({
      from: 'BridgeCraft Website <onboarding@resend.dev>',
      to,
      subject: `New Inquiry: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #7bfbfc; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 120px;">Name</td>
              <td style="padding: 8px 12px; color: #333;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px; color: #333;">
                <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Phone</td>
              <td style="padding: 8px 12px; color: #333;">${body.phone ? escapeHtml(body.phone) : '—'}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Subject</td>
              <td style="padding: 8px 12px; color: #333;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <h3 style="margin: 0 0 8px; color: #555; font-size: 14px;">Message</h3>
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from the BridgeCraft website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
