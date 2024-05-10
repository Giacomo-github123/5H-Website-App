import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../assets/5H logo.png';

const Logo: React.FC = () => {
  return (
    <Container className="p-0 d-flex justify-content-start align-items-start">
      <img src={logo} alt="The Fifth Humour Logo" style={{ maxWidth: '200px', height: 'auto' }} />
    </Container>
  );
};

export default Logo;