
import {Resend} from 'resend';
const resend = new Resend (process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (email: string, token: string) => {
        //Will need to change this to dynamic if deployed.
     const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Please confirm your email",
        html:   `<p>
        <a href="${confirmLink}">Click here to confirm your email</a>
        </p>`,
    })
} 

export const sendPasswordResetEmail = async (email: string, token: string) => {
    //Will need to change this to dynamic if deployed.
 const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please reset your password",
    html:   `<p>
    <a href="${resetLink}">Click here to reset your password</a>
    </p>`,
})
} 
