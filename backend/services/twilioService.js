const twilio = require('twilio');

function getClient() {
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

async function sendWhatsApp(phone, messageBody) {
  const client = getClient();
  const msg = await client.messages.create({
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
    to:   `whatsapp:${phone}`,
    body: messageBody,
  });
  return { messageSid: msg.sid, to: msg.to, status: msg.status };
}

module.exports = { sendWhatsApp };
