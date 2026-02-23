const nodemailer = require('nodemailer');
const logger = require('../config/logger');
const { email: emailConfig } = require('../config');

let transporter = null;

const getTransporter = () => {
  if (!emailConfig.enabled) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  });

  return transporter;
};

const buildInternalEmail = (request) => ({
  from: emailConfig.from,
  to: emailConfig.teamRecipients.join(', '),
  subject: `Nueva solicitud de ${request.name}`,
  text: `Nueva solicitud recibida:\n\nNombre: ${request.name}\nEmail: ${request.email}\nTeléfono: ${request.phone}\nDescripción: ${request.description}\n\nID: ${request._id}`,
  html: `
    <h2>Nueva solicitud recibida</h2>
    <p><strong>Nombre:</strong> ${request.name}</p>
    <p><strong>Email:</strong> ${request.email}</p>
    <p><strong>Teléfono:</strong> ${request.phone}</p>
    <p><strong>Descripción:</strong><br>${request.description.replace(/\n/g, '<br>')}</p>
    <p><strong>ID:</strong> ${request._id}</p>
  `,
});

const buildClientEmail = (request) => {
  if (!request.email) return null;

  const replyTo = emailConfig.replyTo || emailConfig.from;

  return {
    from: emailConfig.from,
    to: request.email,
    replyTo,
    subject: '¡Gracias por tu solicitud! ✅',
    text: `Hola ${request.name},\n\nGracias por contactarnos. Nuestro equipo revisará tu solicitud y te responderemos a este mismo correo.\n\nResumen:\n- Teléfono: ${request.phone}\n- Descripción: ${request.description}\n\nEquipo Uixom`,
    html: `
      <p>Hola ${request.name},</p>
      <p>Gracias por contactarnos. Nuestro equipo revisará tu solicitud y te responderemos a este mismo correo.</p>
      <p><strong>Resumen:</strong><br>
      Teléfono: ${request.phone}<br>
      Descripción: ${request.description.replace(/\n/g, '<br>')}</p>
      <p>Equipo Uixom</p>
    `,
  };
};

exports.sendNewRequestNotifications = async (request) => {
  if (!emailConfig.enabled) {
    logger.warn('Email service not configured. Skipping email notifications.');
    return;
  }

  try {
    const transport = getTransporter();
    if (!transport) return;

    const messages = [buildInternalEmail(request)];
    const clientEmail = buildClientEmail(request);
    if (clientEmail) messages.push(clientEmail);

    await Promise.all(messages.map((msg) => transport.sendMail(msg)));
    logger.info(`Emails sent for request ${request._id}`);
  } catch (err) {
    logger.error(`Error sending email notification: ${err.message}`);
  }
};
