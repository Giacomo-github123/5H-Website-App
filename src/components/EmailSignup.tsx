import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const EmailSignup: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('Submitting email:', email);
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5173/api/subscribe?email=${email}`, {
                method: 'GET',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to subscribe. Server responded with: ${errorText}`);
            }
            alert('Thank you for subscribing!');
            setEmail('');  // Clear the input after successful submission
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Subscription error:', error.message);
                alert(error.message);
            } else {
                console.error('An unexpected error occurred:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Stay Updated!</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Subscribe
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EmailSignup;
