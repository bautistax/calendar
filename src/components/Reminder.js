import React, { useState } from "react";
import emailjs from "emailjs-com"; // Asegúrate de instalar la librería 'emailjs-com'

const Reminder = ({ event }) => {
  const [isReminderSent, setIsReminderSent] = useState(false);

  // Función para enviar el recordatorio por correo electrónico
  const sendReminderEmail = async () => {
    try {
      const templateParams = {
        to_email: "destinatario@example.com", // Cambia esto al correo electrónico del destinatario
        subject: `Recordatorio: ${event.title}`,
        message: `No olvides el evento '${event.title}' el ${event.date} a las ${event.time}.`,
      };

      const response = await emailjs.send(
        "tu_servicio_de_correo",
        "tu_plantilla_de_correo",
        templateParams,
        "tu_usuario_de_emailjs"
      );

      if (response.status === 200) {
        setIsReminderSent(true);
        alert("Recordatorio enviado con éxito.");
      }
    } catch (error) {
      console.error("Error al enviar el recordatorio por correo electrónico:", error);
      alert("Error al enviar el recordatorio por correo electrónico.");
    }
  };

  return (
    <div>
      {isReminderSent ? (
        <p>Recordatorio enviado</p>
      ) : (
        <button onClick={sendReminderEmail}>Enviar Recordatorio</button>
      )}
    </div>
  );
};

export default Reminder;
