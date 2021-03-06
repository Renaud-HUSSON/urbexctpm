require('dotenv').config()
const nodemailer = require("nodemailer");
const { htmlToText } = require('html-to-text');
class Mailer {
  
  static sendMail = async (to, header, body, attachments) => {
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
    
    try {
      await transporter.sendMail({
        from: 'urbexctpm <noreply@urbexctpm.fr>',
        to: to,
        subject: header,
        text: htmlToText(body),
        html: `<pre style="font-size: 1.2rem;">${body}</pre>`,
        attachments: attachments ? attachments : ''
      })
      return {
        success: true,
        message: 'Le mail a bien été envoyé !'
      }
    }catch(err){
      console.log(`Erreur lors de l'envoie du mail: ${err}`)
    }
  }
}

module.exports = Mailer