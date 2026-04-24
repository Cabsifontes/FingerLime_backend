const transporter = require("../configs/nodemailer.config");

const sendContactEmails = async (nombre, email, mensaje) => {
  const mailToAdmin = {
    from: process.env.EMAIL_USER,
    to: "calabrianfingerlime@gmail.com",
    subject: `Nuovo messaggio da ${nombre}`,
    text: `Email: ${email}\nMessaggio: ${mensaje}`,
  };

  const mailToClient = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Grazie per averci contattato - Calabrian Finger Lime",
    html: `
      <div style="font-family: sans-serif;">
        <h2>Ciao ${nombre},</h2>
        <p>Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.</p>
        <p>Cordiali saluti,<br>Il team di Calabrian Finger Lime</p>
      </div>
    `,
  };

  return Promise.all([
    transporter.sendMail(mailToAdmin),
    transporter.sendMail(mailToClient),
  ]);
};

module.exports = { sendContactEmails };
