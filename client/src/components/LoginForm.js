import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../style/LoginForm.css";
import logo from '../image/logo.png';

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const LoginForm = ({onSwitchForm}) => {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: userFormData,
      });
  
      // Check if the login mutation was successful
      if (data && data.login && data.login.token) {
        Auth.login(data.login.token);
      // Navigate to Dashboard on successful sign-up
      navigate('/dashboard');

      } else {
      // Handle login failure here, show an error message or something
      console.error("Login failed: invalid response");
      setShowAlert(true);
      }
        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container body">
  <Container>
    <Row className="align-items-center justify-content-center vh-100">
      <Col md={12} className="align-items-center justify-content-center login-form">
        <Row className="welcome-login-container">
          <Col md={7} className="welcome-text">
            <img src={logo} alt="JobJourney Logo" className="logo-image" />
            <br/>
            <h1>Welcome to JobJourney!</h1>
            <br/>
            <p>
            Take control of your job search with our intuitive Job Tracker app. 
            Effortlessly manage your job applications, from submission to offer acceptance. Stay organized, stay informed, and elevate your job search journey
            </p>
          </Col>
          <Col md={1} className="divider-col">
            <div className="divider-line"></div>
          </Col>
          <Col md={3}>
            <br/>
            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your login credentials!
              </Alert>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder='Your email'
                  name='email'
                  value={userFormData.email}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder='Your password'
                  name='password'
                  value={userFormData.password}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
              </Form.Group>
              <Button className="login-btn mb-3 d-block mx-auto" disabled={!(userFormData.email && userFormData.password)} type='submit'>Login</Button>
            </Form>
            <p className="text-center">
              Don't have an account?{' '}
              <span className="switch-form-link" onClick={onSwitchForm}>
                Sign up here
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
</div>
  );
};

export default LoginForm;
