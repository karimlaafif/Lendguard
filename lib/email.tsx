// Email utility functions
// In production, integrate with services like Resend, SendGrid, etc.

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // TODO: Implement actual email sending
  // For now, just log the email
  console.log("[EMAIL_SEND]", {
    to,
    subject,
    preview: html.substring(0, 100),
  })

  // In production, use a service like Resend:
  // const { Resend } = require('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'noreply@lendguard.ai',
  //   to,
  //   subject,
  //   html,
  // });
}

export async function sendPasswordResetEmail(email: string, token: string, name: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

  await sendEmail({
    to: email,
    subject: "Reset Your Password - LendGuard AI",
    html: getPasswordResetEmailHtml(resetUrl),
  })
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`

  await sendEmail({
    to: email,
    subject: "Verify Your Email - LendGuard AI",
    html: getVerificationEmailHtml(verificationUrl),
  })
}

export function getVerificationEmailHtml(verificationUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; background-color: #0f172a; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0ea5e9; margin: 0;">LendGuard AI</h1>
          </div>
          <h2 style="color: #ffffff; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 30px;">
            Thank you for creating an account with LendGuard AI. Please click the button below to verify your email address and activate your account.
          </p>
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(to right, #0ea5e9, #10b981); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #0ea5e9; word-break: break-all;">${verificationUrl}</a>
          </p>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 30px; padding-top: 30px; border-top: 1px solid #334155;">
            This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      </body>
    </html>
  `
}

export function getPasswordResetEmailHtml(resetUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; background-color: #0f172a; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0ea5e9; margin: 0;">LendGuard AI</h1>
          </div>
          <h2 style="color: #ffffff; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 30px;">
            We received a request to reset your password. Click the button below to choose a new password.
          </p>
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(to right, #0ea5e9, #10b981); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">
              Reset Password
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #0ea5e9; word-break: break-all;">${resetUrl}</a>
          </p>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 30px; padding-top: 30px; border-top: 1px solid #334155;">
            This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
      </body>
    </html>
  `
}
