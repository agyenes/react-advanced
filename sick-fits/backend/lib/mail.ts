import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
    //@ts-ignore
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function makeANiceEmail(text: string) {
    return `
        <div style="
            border. 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
        ">
            <h2>Hello</h2>
            <p>${text}</p>
            <p>Bye</p>
        </div>
    `;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
    const info = await transport.sendMail({
        to,
        from: 'test@example.com',
        subject: 'Your password reset token',
        html: makeANiceEmail(`Your Password Reset Token is here!
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken }">Click here to reset!</a>
        `),
    })
    if (process.env.MAIL_USER.includes('ethereal.email')) {
        console.log(`Message sent! Preview it at ${getTestMessageUrl(info)}`);
    }
}