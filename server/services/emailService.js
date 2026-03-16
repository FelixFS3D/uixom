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
  subject: `🔔 Nueva solicitud de ${request.name}`,
  text: `Nueva solicitud recibida:\n\nNombre: ${request.name}\nEmail: ${request.email}\nTeléfono: ${request.phone}\nDescripción: ${request.description}\n\nID: ${request._id}`,
  html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Solicitud - UIXOM</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #030712;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #030712;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #111827 0%, #030712 100%); border-radius: 16px; border: 1px solid rgba(34, 211, 238, 0.2); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
              
              <!-- Header con Logo -->
              <tr>
                <td align="center" style="padding: 50px 40px 30px 40px; background: linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%); border-radius: 16px 16px 0 0;">
                  <h1 style="margin: 0; font-size: 56px; font-weight: 900; letter-spacing: -2px; line-height: 1;">
                    <span style="color: #ffffff;">UI</span><span style="background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">X</span><span style="color: #ffffff;">OM</span>
                  </h1>
                  <div style="height: 3px; width: 100px; background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); margin: 15px auto 0; border-radius: 2px;"></div>
                </td>
              </tr>

              <!-- Contenido Principal -->
              <tr>
                <td style="padding: 40px;">
                  <!-- Badge de Alerta -->
                  <div style="text-align: center; margin-bottom: 25px;">
                    <span style="display: inline-block; padding: 8px 20px; background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); color: #ffffff; font-size: 14px; font-weight: 600; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">
                      🔔 Nueva Solicitud
                    </span>
                  </div>
                  
                  <!-- Título -->
                  <h2 style="margin: 0 0 30px 0; font-size: 28px; font-weight: 700; color: #ffffff; text-align: center;">
                    Solicitud Recibida
                  </h2>

                  <!-- Card de Información del Cliente -->
                  <div style="background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 12px; padding: 25px; margin: 30px 0;">
                    <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #22d3ee;">
                      👤 Información del Cliente
                    </h3>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
                          <span style="color: #9ca3af; font-size: 14px;">Nombre:</span><br>
                          <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${request.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
                          <span style="color: #9ca3af; font-size: 14px;">Email:</span><br>
                          <a href="mailto:${request.email}" style="color: #22d3ee; font-size: 16px; font-weight: 500; text-decoration: none;">${request.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
                          <span style="color: #9ca3af; font-size: 14px;">Teléfono:</span><br>
                          <a href="tel:${request.phone}" style="color: #22d3ee; font-size: 16px; font-weight: 500; text-decoration: none;">${request.phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #9ca3af; font-size: 14px;">ID de Solicitud:</span><br>
                          <span style="color: #a855f7; font-size: 14px; font-weight: 600; font-family: 'Courier New', monospace;">${request._id}</span>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Card de Descripción -->
                  <div style="background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; padding: 25px; margin: 30px 0;">
                    <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #a855f7;">
                      📝 Descripción del Proyecto
                    </h3>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${request.description.replace(/\n/g, '<br>')}</p>
                  </div>

                  <!-- Nota de Acción -->
                  <div style="background: linear-gradient(90deg, rgba(34, 211, 238, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%); border-left: 3px solid #a855f7; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d1d5db;">
                      ⚡ <strong style="color: #ffffff;">Acción requerida:</strong> Revisa esta solicitud y contacta al cliente dentro de las próximas 24-48 horas.
                    </p>
                  </div>

                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 35px 0;">
                    <a href="mailto:${request.email}?subject=Re: Tu solicitud en UIXOM" style="display: inline-block; padding: 16px 32px; background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 10px; box-shadow: 0 10px 25px rgba(34, 211, 238, 0.3);">
                      ✉️ Responder al Cliente
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background: rgba(3, 7, 18, 0.8); border-radius: 0 0 16px 16px; border-top: 1px solid rgba(75, 85, 99, 0.3);">
                  <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #9ca3af; text-align: center;">
                    <strong style="background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Sistema de Notificaciones UIXOM</strong><br>
                    Notificación automática de nueva solicitud
                  </p>
                  <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280; text-align: center;">
                    Fecha: ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
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
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Solicitud - UIXOM</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #030712;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #030712;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #111827 0%, #030712 100%); border-radius: 16px; border: 1px solid rgba(34, 211, 238, 0.2); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
                
                <!-- Header con Logo -->
                <tr>
                  <td align="center" style="padding: 50px 40px 30px 40px; background: linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%); border-radius: 16px 16px 0 0;">
                    <h1 style="margin: 0; font-size: 56px; font-weight: 900; letter-spacing: -2px; line-height: 1;">
                      <span style="color: #ffffff;">UI</span><span style="background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">X</span><span style="color: #ffffff;">OM</span>
                    </h1>
                    <div style="height: 3px; width: 100px; background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); margin: 15px auto 0; border-radius: 2px;"></div>
                  </td>
                </tr>

                <!-- Contenido Principal -->
                <tr>
                  <td style="padding: 40px;">
                    <!-- Título -->
                    <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #ffffff; text-align: center;">
                      ¡Solicitud Recibida con Éxito!
                    </h2>
                    
                    <!-- Mensaje de Bienvenida -->
                    <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #d1d5db; text-align: center;">
                      Hola <strong style="color: #22d3ee;">${request.name}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #d1d5db;">
                      Gracias por contactarnos. Hemos recibido tu solicitud y nuestro equipo la está revisando. Te responderemos muy pronto a este mismo correo.
                    </p>

                    <!-- Card de Resumen -->
                    <div style="background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 12px; padding: 25px; margin: 30px 0;">
                      <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #22d3ee;">
                        📋 Resumen de tu solicitud
                      </h3>
                      
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
                            <span style="color: #9ca3af; font-size: 14px;">Teléfono:</span><br>
                            <span style="color: #ffffff; font-size: 16px; font-weight: 500;">${request.phone}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0 0 0;">
                            <span style="color: #9ca3af; font-size: 14px;">Descripción:</span><br>
                            <span style="color: #ffffff; font-size: 16px; font-weight: 500; line-height: 1.5;">${request.description.replace(/\n/g, '<br>')}</span>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Mensaje de Confianza -->
                    <div style="background: linear-gradient(90deg, rgba(34, 211, 238, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%); border-left: 3px solid #22d3ee; border-radius: 8px; padding: 20px; margin: 30px 0;">
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d1d5db;">
                        💡 <strong style="color: #ffffff;">Tiempo de respuesta:</strong> Nuestro equipo se pondrá en contacto contigo en un plazo máximo de 24-48 horas hábiles.
                      </p>
                    </div>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 35px 0;">
                      <a href="${emailConfig.websiteUrl || 'https://uixom.com'}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 10px; box-shadow: 0 10px 25px rgba(34, 211, 238, 0.3);">
                        Visitar UIXOM
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background: rgba(3, 7, 18, 0.8); border-radius: 0 0 16px 16px; border-top: 1px solid rgba(75, 85, 99, 0.3);">
                    <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #9ca3af; text-align: center;">
                      <strong style="background: linear-gradient(90deg, #22d3ee 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Equipo UIXOM</strong><br>
                      Experiencias Digitales del Futuro
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280; text-align: center;">
                      Este correo fue enviado en respuesta a tu solicitud de contacto.<br>
                      Si tienes alguna pregunta, responde directamente a este correo.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
