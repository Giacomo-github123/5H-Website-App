import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../assets/5H logo.png';

const Logo: React.FC = () => {
    return (
        <Container className="p-0">
            <div style={{ position: 'absolute', top: '56px', left: '0px' }}> {/* Adjust the top value if your navbar height is different */}
                <img
                    src={logo} // Update the path to your logo
                    alt="The Fifth Humour Logo"
                    style={{ width: '300px', height: 'auto' }} // You can adjust the size as needed
                />
            </div>
        </Container>
    );
};

export default Logo;
