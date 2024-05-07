import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const navbar = {backgroundColor: '#268540', color: '#ffffff'};

const Header: React.FC = () => {
    return (
        <Navbar style={navbar}>
            <Container>
                {/* <Navbar.Brand href="#home">
                    <img
                        alt="The Fifth Humour Logo"
                        src={logo} // Update the path to your logo
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    The Fifth Humour
                </Navbar.Brand> */}
                <Nav className="me-auto">
                    <Nav.Link href="#home" style={{ color: '#ffffff' }}>HOME</Nav.Link>
                    <Nav.Link href="#gallery" style={{ color: '#ffffff' }}>PHOTO GALLERY</Nav.Link>
                    <Nav.Link href="#team" style={{ color: '#ffffff' }}>MEET THE HUMOURS</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;