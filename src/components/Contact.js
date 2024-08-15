import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_skpfw5q', 'template_j7fjg3n', form.current, {
        publicKey: 'vaHa3Jdd2CmHK33ey',
      })
      .then(
        () => {
          setStatus('SUCCESS');
        },
        (error) => {
          setStatus('FAILED');
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input
          type="text"
          name="user_name"
          className="input-field"
          placeholder="Your Name"
        />
        <input
          type="email"
          name="user_email"
          className="input-field"
          placeholder="Your Email"
        />
        <textarea
          name="message"
          className="input-field"
          placeholder="Your Message"
        />
        <input type="submit" value="Send" className="submit-button" />
        {status && (
          <p className={status === 'SUCCESS' ? 'success-message' : 'error-message'}>
            {status === 'SUCCESS' ? 'Message sent successfully!' : 'Failed to send message.'}
          </p>
        )}
      </form>
    </div>
  );
}

export default Contact;
