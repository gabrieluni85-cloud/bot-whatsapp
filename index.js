const express = require('express');
const app = express();
app.use(express.json());

// CONFIGURACIÓN: Cambia esto por lo que pongas en Meta
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "RK_COMPUTACION_2025"; 

// 1. Verificación del Webhook para Meta
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("¡Webhook verificado exitosamente!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 2. Recepción de mensajes
app.post('/webhook', (req, res) => {
  const body = req.body;
  console.log("Evento recibido:", JSON.stringify(body, null, 2));
  
  // Aquí es donde tu servidor recibe el mensaje real de WhatsApp
  res.status(200).send("EVENT_RECEIVED");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor activo en puerto ' + PORT));
