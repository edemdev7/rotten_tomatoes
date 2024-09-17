import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: '"My Rotten Tomatoes" <no-reply@myrottentomatoes.com>',
    to: email,
    subject: 'Vérification de votre email',
    html: `<p>Merci de vérifier votre email en cliquant sur le lien suivant :</p>
           <a href="${verificationUrl}">Vérifier mon email</a>`,
  });
};
