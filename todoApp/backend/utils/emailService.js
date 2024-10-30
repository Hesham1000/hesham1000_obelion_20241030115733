const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.db',
  port: 587,
  secure: false,
  auth: {
    user: 'user@example.com',
    pass: 'password',
  },
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'noreply@example.com',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};