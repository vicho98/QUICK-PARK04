const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configuración de transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Ruta para enviar correos
app.post('/api/send-email', (req, res) => {
  try {
    const { rentalType, rentalDate, duration, name, email, markerInfo } = req.body;

    if (!rentalType || !rentalDate || !duration || !name || !email) {
      return res.status(400).json({ success: false, message: 'Faltan datos requeridos en la solicitud.' });
    }

    const markerDetails = markerInfo
      ? `
        <ul>
          <li><strong>Título:</strong> ${markerInfo.title || 'No especificado'}</li>
          <li><strong>Propietario:</strong> ${markerInfo.owner || 'No especificado'}</li>
          <li><strong>Dirección:</strong> ${markerInfo.address || 'No especificado'}</li>
          <li><strong>Descripción:</strong> ${markerInfo.description || 'No especificado'}</li>
        </ul>
      `
      : '<p>Sin información adicional del estacionamiento.</p>';

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Confirmación de Reserva',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50; margin-bottom: 0.5em;">Confirmación de Reserva</h2>
            <p>Hola <strong>${name}</strong>,</p>
            <p>Tu reserva ha sido confirmada para el <strong>${rentalDate}</strong> con una duración de <strong>${duration} horas</strong>.</p>
            <h3 style="margin-top: 1em;">Detalles del estacionamiento:</h3>
            ${markerDetails}
            <p style="margin-top: 1em;">Gracias por usar nuestra aplicación <strong>QuickPark</strong>.</p>
            <p style="margin-top: 2em; font-size: 0.9em; color: #555;">Este es un mensaje generado automáticamente. Por favor, no respondas a este correo.</p>
          </div>
        `,
      };
      
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error.message);
        return res.status(500).json({
          success: false,
          message: 'Error al enviar el correo.',
          error: error.message,
        });
      }
      console.log('Correo enviado con éxito:', info.response);
      return res.status(200).json({ success: true, message: 'Correo enviado con éxito.' });
    });
  } catch (error) {
    console.error('Error en el servidor:', error.message);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Ocurrió un error en el servidor.',
        error: error.message,
      });
    }
  }
});

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
