
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {  AiOutlineLock } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../utils/mutations'

function UserProfile() {
  const [showModal, setShowModal] = useState(false);
  // const [username, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
// Function that triggers when the user clicks the button on the modal and sends info to the DB..
  const handleChangePassword = async (newPassword) => {


    if (oldPassword === password) {
      console.log('CANT USE THE SAME PASSWORD!')
    } else {

    try {
      const response = await updatePassword({
        variables: {
          password
        },
      });
      setShowSuccessModal(true);
      console.log(response.data);
      setOldPassword('');
      setPassword('')
    } catch(error) {
      console.log(error);
    };
    handleClose();
  }
  };

  const SuccessModal = ({ show, onClose }) => {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header className="justify-content-center bg-success card-font" closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center justify-content-center card-font" >
          Your password has been changed successfully!
          <br/>
          <br/>
          <Button  variant='warning card-font' onClick={onClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    );
}

  return (
    <div>
      <Button variant="btn" onClick={handleShow}>
        <i className="fas fa-user-cog"></i>   Settings
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#2f3e46', color: 'white' }}>
          <Modal.Title className="align-items-center justify-content-center card-font">
            Change your password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='card-font'>
            <Form.Group className="my-2" controlId="oldPassword">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineLock /> Enter your current password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{ borderRadius: '16px' }}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label style={{ fontWeight: 'bold' }}>
                <AiOutlineLock /> Enter your new password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: '16px' }}
              />
              <br/>
              {oldPassword!=='' && oldPassword === password && (<div className="text-danger">New password cannot be the same as old one!</div>)}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='card-font' style={{ backgroundColor: '#2f3e46', color: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleChangePassword}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Render the success modal */}
      <SuccessModal show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
}

export default UserProfile;
