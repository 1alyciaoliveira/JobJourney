import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../style/SignForm.css";

const SignForm = ({ onSwitchForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Here you can add your login logic
    console.log('Logging in with:', email, password);
    setEmail('');
    setPassword('');
  };
  return (
    <div className="login-container">
      <Container>
        <Row className="align-items-center justify-content-center vh-100">
          <Col md={6} className="align-items-center justify-content-center welcome-text">
            <h1>Welcome to JobTracker!</h1>
            <p>This platform is designed to streamline your job search process by easily keeping track of all your job applications in one place. Simply input the relevant details, including the job title, company, application date, salary information, and current status. As you progress through the hiring process, you can update the status of each application, whether it's 'Applied,' 'Interviewing,' 'Offer Extended,' or 'Accepted.' Say goodbye to scattered notes and missed opportunities, stay organized and informed about your job opportunities.Our application is your solution for a successful job search journey</p>
          </Col>
          <Col md={5} className="align-items-center justify-content-center login-form">
            <h2>SignForm</h2>
            <p>Enter your credentials to acces your account</p>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <Button className="login-btn" type="submit">Login</Button>
            </Form>
            <p>        Don't have an account?{' '}
              <span className="switch-form-link" onClick={onSwitchForm}>
                Sign up here
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignForm;

