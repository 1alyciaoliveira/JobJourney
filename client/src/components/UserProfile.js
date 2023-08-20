
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../utils/mutations'

function UserProfile() {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChangePassword = async (newPassword) => {
    // TODOD update logic here
    console.log('Updated profile:', { userName, email, password });
    try {
      const response = await updatePassword({
        variables: {
          newPassword,
        },
      });
      console.log(response.data);
    } catch(error) {
      console.log(error);
    };
    handleClose();
  };

  return (
    <div>
      <Button variant="btn" onClick={handleShow}>
        <i class="fas fa-user-cog"></i>   Settings
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#2f3e46', color: 'white' }}>
          <Modal.Title className="align-items-center justify-content-center">
            Change your password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group  className="my-2" controlId="userName">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineUser /> Enter your username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your user name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ borderRadius: '16px' }}
              />
            </Form.Group>

            {/* <Form.Group className="my-2" controlId="email">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineMail /> Enter your email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '16px' }}
              />
            </Form.Group> */}

            <Form.Group className="my-2" controlId="password">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineLock /> New Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: '16px' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#2f3e46', color: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={()=>handleChangePassword(password)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserProfile;
