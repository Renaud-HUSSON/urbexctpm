const nodemailer = require("nodemailer");
const { htmlToText } = require('html-to-text');

class Mailer {
  
  static sendMail = async (to, header, body) => {

    const user = process.env.MAIL_USER
    const password = process.env.MAIL_PASSWORD
    const host = process.env.MAIL_HOST

    const transporter = nodemailer.createTransport({
      host: host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: user,
        pass: password,
      },
    });
    
    await transporter.sendMail({
      from: 'urbexctpm <noreply@urbexctpm.fr>',
      to: to,
      subject: header,
      text: htmlToText(body),
      html: `<pre>${body}</pre>`
    })
    return {
      success: true,
      message: 'Le mail a bien été envoyé !'
    }
  }
}

module.exports = Mailer