
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

function UserProfile() {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleUpdate = () => {
    // TODOD update logic here
    console.log('Updated profile:', { userName, email, password });
    handleClose();
  };

  return (
    <div>
      <Button variant="btn" onClick={handleShow}>
        Profile
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#2f3e46', color: 'white' }}>
          <Modal.Title className="align-items-center justify-content-center">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group  className="my-2" controlId="userName">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineUser /> User Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your user name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ borderRadius: '16px' }}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineMail /> Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '16px' }}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineLock /> Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
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
          <Button variant="warning" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserProfile;
