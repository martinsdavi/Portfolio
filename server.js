require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// rate limit for contact endpoint
const limiter = rateLimit({ windowMs: 60 * 1000, max: 10 });

// serve static files (the frontend)
app.use(express.static(path.join(__dirname)));

app.get('/ping', (req, res) => res.json({ ok: true }));

app.post('/api/contact', limiter, async (req, res) => {
  const { name, email, message } = req.body;
  if(!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  // If SMTP config exists, try send email; otherwise save to file for demo
  const smtpHost = process.env.SMTP_HOST;
  if(smtpHost){
    try{
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      });

      const mail = {
        from: process.env.SMTP_FROM || 'no-reply@example.com',
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        subject: `Contato do site - ${name}`,
        text: `${message}\n\nEnviado por: ${name} <${email}>`,
        html: `<p>${message}</p><p>Enviado por: <strong>${name}</strong> &lt;${email}&gt;</p>`
      };

      const info = await transporter.sendMail(mail);
      return res.json({ ok: true, messageId: info.messageId });
    }catch(err){
      console.error('Erro ao enviar email:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  }

  // fallback: write to file
  const fs = require('fs');
  const out = `---\n${new Date().toISOString()}\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n`;
  fs.appendFileSync(path.join(__dirname, 'contact.log'), out);
  return res.json({ ok: true, saved: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
