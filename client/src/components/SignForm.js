import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../style/SignForm.css";
import logo from '../image/logo.png';

// Import mutations
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const SignForm = ({ onSwitchForm }) => {
  const navigate = useNavigate();
  
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

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
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
      // Navigate to Dashboard on successful sign-up
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
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
            <h2>Get started!</h2>
            

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              {/* show alert if server response is bad */}
              <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your signup!
              </Alert>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder= 'Your username'
                  name= 'username'
                  value={userFormData.username}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder= 'Your email address'
                  name= 'email'
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
                  placeholder= 'Your password'
                  name= 'password'
                  value={userFormData.password}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
              </Form.Group>

              <Button className="login-btn mb-3 d-block mx-auto" disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'>Sign up</Button>
            </Form>


            <p className="text-center">       Already have an account?{' '}
              <span className="switch-form-link" onClick={onSwitchForm}>
                Login here
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

export default SignForm;





// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import "../style/LoginForm.css";

// const SignForm = ({ onSwitchForm }) => {
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
//     <div className="login-container">
//       <Container>
//         <Row className="align-items-center justify-content-center vh-100">
//           <Col md={6} className="align-items-center justify-content-center welcome-text">
//             <h1>Welcome to JobTracker!</h1>
//             <p>This platform is designed to streamline your job search process by easily keeping track of all your job applications in one place. Simply input the relevant details, including the job title, company, application date, salary information, and current status. As you progress through the hiring process, you can update the status of each application, whether it's 'Applied,' 'Interviewing,' 'Offer Extended,' or 'Accepted.' Say goodbye to scattered notes and missed opportunities, stay organized and informed about your job opportunities.Our application is your solution for a successful job search journey</p>
//           </Col>
//           <Col md={5} className="align-items-center justify-content-center login-form">
//             <h2>Get started!</h2>
//             <p>Please, sp</p>
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
//               <Form.Group>
//                 <Form.Label>Confirm your password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   required
//                 />
//               </Form.Group>
//               <Button className="login-btn" type="submit">Sign up</Button>
//             </Form>
//             <p>       Already have an account?{' '}
//               <span className="switch-form-link" onClick={onSwitchForm}>
//                 Login here
//               </span>
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SignForm;

