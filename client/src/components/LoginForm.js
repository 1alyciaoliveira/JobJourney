import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../style/LoginForm.css";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const LoginForm = ({onSwitchForm}) => {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

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
          <Col md={7} className="align-items-center justify-content-center welcome-text">
            <h1>Welcome to JobJourney!</h1>
            <p>This platform is designed to streamline your job search process by easily keeping track of all your job applications in one place. Simply input the relevant details, including the job title, company, application date, salary information, and current status. As you progress through the hiring process, you can update the status of each application, whether it's 'Applied,' 'Interviewing,' 'Offer Extended,' or 'Accepted.' Say goodbye to scattered notes and missed opportunities, stay organized and informed about your job opportunities.Our application is your solution for a successful job search journey</p>
          </Col>
          <Col md={4} className="align-items-center justify-content-center login-form">
            <h2>Login</h2>
            <p>Enter your credentials to acces your account</p>
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
              <Button className="login-btn" disabled={!(userFormData.email && userFormData.password)}
          type='submit'>Login</Button>
            </Form>
            <p>
              Don't have an account?{' '}
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

export default LoginForm;










// const LoginForm = ({ onSwitchForm }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     // Here you can add your login logic
//     console.log('Logging in with:', email, password);
//     setEmail('');
//     setPassword('');
//   };
//   return (
//     <div className="login-container body">
//       <Container>
//         <Row className="align-items-center justify-content-center vh-100">
//           <Col md={7} className="align-items-center justify-content-center welcome-text">
//             <h1>Welcome to JobJourney!</h1>
//             <p>This platform is designed to streamline your job search process by easily keeping track of all your job applications in one place. Simply input the relevant details, including the job title, company, application date, salary information, and current status. As you progress through the hiring process, you can update the status of each application, whether it's 'Applied,' 'Interviewing,' 'Offer Extended,' or 'Accepted.' Say goodbye to scattered notes and missed opportunities, stay organized and informed about your job opportunities.Our application is your solution for a successful job search journey</p>
//           </Col>
//           <Col md={4} className="align-items-center justify-content-center login-form">
//             <h2>Login</h2>
//             <p>Enter your credentials to acces your account</p>
//             <Form onSubmit={handleLogin}>
//               <Form.Group>
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   required
//                 />
//               </Form.Group>
//               <Button className="login-btn" type="submit">Login</Button>
//             </Form>
//             <p>
//               Don't have an account?{' '}
//               <span className="switch-form-link" onClick={onSwitchForm}>
//                 Sign up here
//               </span>
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default LoginForm;

