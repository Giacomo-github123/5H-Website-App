import React from 'react';
import Header from '../components/Header';
import EmailSignup from '../components/EmailSignup';
import { Container } from 'react-bootstrap';
import Logo from './Logo';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <Container className="my-5">
                <h1>Welcome to The Fifth Humour, Yale's oldest, funniest, sexiest sketch comedy group!</h1>
                <p>@thefifthhumour on Instagram</p>
                {/* Placeholder for future components */}
            </Container>
            <EmailSignup />
            <Logo />
        </div>
    );
};

export default HomePage;
