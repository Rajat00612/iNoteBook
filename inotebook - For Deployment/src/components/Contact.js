import React from 'react';
import { Envelope, Whatsapp, Linkedin, Github } from 'react-bootstrap-icons';
function Contact() {
  return (
    <div className='vh-100 container my-4'>
      <h2 className="mb-4 text-center">Contact Us</h2>
      
      <div className="card p-4 shadow">
        <div className="card-body">
          <p className="card-text">
            If you have any questions, feedback, or suggestions regarding iNotebook, feel free to get in touch. We are here to assist you and improve your experience.
          </p>

          <hr />

          <h5>Contact Details</h5>
   
          <ul className="list-unstyled">
      <li className="mb-2">
        <strong>Email:</strong> 
        <a className='link-underline-light ms-2' href="mailto:rajatkumar17141@gmail.com">
          <Envelope className="me-1" /> Rajatkumar17141@gmail.com
        </a>
      </li>

      <li className="mb-2">
        <strong>WhatsApp:</strong> 
        <a className='link-underline-light ms-2' href="https://wa.me/9891875491?text=Hello%20" target="_blank" rel="noopener noreferrer">
          <Whatsapp className="me-1" /> 9891875491
        </a>
      </li>

      <li className="mb-2">
        <strong>LinkedIn:</strong> 
        <a className='link-underline-light ms-2' href="https://www.linkedin.com/in/rajat-b115a5355" target="_blank" rel="noopener noreferrer">
          <Linkedin className="me-1" /> Visit LinkedIn Profile
        </a>
      </li>

      <li className="mb-2">
        <strong>GitHub:</strong> 
        <a className='link-underline-light ms-2' href="https://github.com/Rajat00612" target="_blank" rel="noopener noreferrer">
          <Github className="me-1" /> Visit GitHub Profile
        </a>
      </li>
    </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Contact;
