import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if SMTP is configured
    const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    console.log(`[Contact API] Attempting to send email. SMTP Configured: ${!!hasSmtpConfig}`);
    if (hasSmtpConfig) {
      console.log(`[Contact API] Host: ${process.env.SMTP_HOST}, Port: ${process.env.SMTP_PORT}, User: ${process.env.SMTP_USER}`);
    }

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER || "no-reply@sblogbr.com"}>`,
      to: process.env.CONTACT_EMAIL || "contato@sblogbr.com",
      replyTo: email,
      subject: `[SB LOG] ${subject || "Novo Contato"}`,
      text: `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
    };

    if (!hasSmtpConfig) {
      console.warn("SMTP configuration missing. Logging email to console.");
      console.log("--- EMAIL CONTENT ---");
      console.log(mailOptions);
      console.log("----------------------");
      // Simulate success for demo purposes if not configured
      return res.json({ success: true, message: "Email logged to console (SMTP not configured)" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
      
      // Verify SMTP on startup
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        
        transporter.verify((error, success) => {
          if (error) {
            console.error("[SMTP] Connection verification failed:", error);
          } else {
            console.log("[SMTP] Server is ready to take our messages");
          }
        });
      } else {
        console.warn("[SMTP] Configuration missing. Emails will be logged to console.");
      }
    });
}

startServer();
