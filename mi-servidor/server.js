require('dotenv').config();  // Cargar variables de entorno desde el archivo .env
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Para habilitar CORS

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración del transportador con credenciales de Gmail desde el archivo .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Usar variable de entorno
    pass: process.env.GMAIL_PASS, // Usar contraseña de aplicación
  },
});

// Ruta para enviar correos
app.post('/api/send-email', (req, res) => {
  const { rentalType, rentalDate, duration, name, email } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER, // Usar variable de entorno para el remitente
    to: email,
    subject: 'Confirmación de Reserva',
    text: `Hola ${name},\n\nTu reserva de tipo ${rentalType} ha sido confirmada para el ${rentalDate} con una duración de ${duration}.\n\nGracias por usar nuestra app.`,
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send('Error al enviar el correo');
    }
    res.status(200).send('Correo enviado con éxito');
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
