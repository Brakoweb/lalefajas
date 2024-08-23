import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:support@lalefajas.com?subject=Contact from ${name}&body=${encodeURIComponent(
      message
    )}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <h1>Contáctanos 📞</h1>
      {submitted ? (
        <p className="success-message">
          ¡Gracias por tu mensaje! Nos comunicaremos con usted pronto.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Enviar Mensaje
          </button>
        </form>
      )}
      <div className="whatsapp-section">
        <h2>Contactanos via WhatsApp</h2>
        <a
          href="https://wa.me/message/MZOLZMY55HXMC1"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          <img
            src="/public/whatsapp.png"
            alt="WhatsApp"
            className="whatsapp-icon"
          />
          Escribenos al WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contact;
