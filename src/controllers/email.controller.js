const emailService = require("../services/email.service");

const sendEmail = async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  try {
    await emailService.sendContactEmails(nombre, email, mensaje);
    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendEmail };
