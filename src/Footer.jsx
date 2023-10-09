import './Footer.css';
import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';

function Footer() {
  return (
    <div className="Footer">
      <div className="row mt-1 px-4 pt-2">
      <div className="col">
        <p className="text-light mb-2">About us</p>
        <p className="text-light mb-2">Testimonials</p>
      </div>
      <div className="col">
        <p className="text-light mb-2">Contact</p>
        <p className="text-light">Privacy policy</p>
      </div>
      <div className="col">
        <p className="text-light fw-bold mb-2">Subscribe to our newsletter</p>
        <InputGroup>
          <InputGroup.Text className="text-light" size="sm" mb="0" id="input"></InputGroup.Text>
        </InputGroup>
      </div>
      </div>
    </div>
  );
}

export default Footer;
