import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import "../style/Board.css";
import BoardJobEdit from './BoardJobEdit';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_APPLICATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { BsExclamationDiamond , MdEventAvailable , MdHourglassFull, MdToday, MdWatchLater} from 'react-icons/bs';

const Board = () => {
  
 
  const { loading, error, data } = useQuery(QUERY_ME);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [removeJobApplication] = useMutation(REMOVE_APPLICATION);
  const [selectedJobIdToDelete, setSelectedJobIdToDelete] = useState(null);

  const currentDate = new Date().toISOString().slice(0, 10);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.me;
  const userJobs = user.jobsApplied;

  
  const confirmDelete = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if(!token) {
      return false;
    }

      try {
        const data = await removeJobApplication({
          variables: { _id },
      })
       removeJobApplication(_id);
      } catch (err) {
        console.error(err);
      }
    };

  
const formatDate = (dateApplied) => {
  if (!dateApplied) {
    return ''; // Return a blank string if dateApplied is empty or falsy
  }
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  const appliedDate = new Date(Date.parse(dateApplied) + timeZoneOffset);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = appliedDate.toLocaleDateString('en-US', options);

  return formattedDate;
};


  const openModal = (job) => {
    setSelectedJob(job);
    setSelectedJobIdToDelete(job._id); 
    setShowModal(true);
  };
  

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
    confirmDelete(selectedJobIdToDelete); 
  };


  const status1Jobs = userJobs.filter((job) => job.status === 'Applied');
  const status2Jobs = userJobs.filter((job) => job.status === 'Interview' || job.status === 'Waiting for response');
  const status3Jobs = userJobs.filter((job) => job.status === 'Accepted' || job.status === 'Job Offer' || job.status === 'Rejected by Company' || job.status === 'Rejected by Me');
  
  return (
    <Container fluid>
      <Row className="d-flex justify-content-around">
        <Col md={4}>
          <Card className="column-status my-3">
            <Card.Header className="column-header text-center">Applied</Card.Header>
            <Card.Body>
            {status1Jobs.map((job, index) => (
                <div
                  key={index}
                  className="card inner-card my-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}
                >
                  <div key={job._id} className="card">
                    <div className="card-body">
                      {job.reminderDate === currentDate && (
                        <BsExclamationDiamond style={{ display: 'block', margin: 'auto', color: 'red', fontSize: '1.5rem',}}/>
                      )}

                      <p className="card-text">{formatDate(job.dateApplied)}</p>    
                      <p className="card-text">{job.jobPosition} at {job.company}</p>
                      <p className="card-text">Current process step: {job.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className=" column-status my-3">
            <Card.Header className="column-header text-center">In Progress</Card.Header>
            <Card.Body>
            {status2Jobs.map((job, index) => (
                <div
                  key={index}
                  className="card inner-card my-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}
                >
                  <div key={job._id} className="card">
                    <div className="card-body">
                      {job.reminderDate === currentDate && (
                        <BsExclamationDiamond style={{ display: 'block', margin: 'auto', color: 'red', fontSize: '1.5rem',}}/>
                      )}

                      <p className="card-text">{formatDate(job.dateApplied)}</p>    
                      <p className="card-text">{job.jobPosition} at {job.company}</p>
                      <p className="card-text">Current process step: {job.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="column-status my-3">
            <Card.Header className="column-header text-center">Solved</Card.Header>
            <Card.Body>
            {status3Jobs.map((job, index) => (
                <div
                  key={index}
                  className="card inner-card my-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}
                >
                  <div key={job._id} className="card">
                    <div className="card-body">
                      {job.reminderDate === currentDate && (
                        <BsExclamationDiamond style={{ display: 'block', margin: 'auto', color: 'red', fontSize: '1.5rem',}}/>
                      )}

                      <p className="card-text">{formatDate(job.dateApplied)}</p>    
                      <p className="card-text">{job.jobPosition} at {job.company}</p>
                      <p className="card-text">Current process step: {job.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton >
          <Modal.Title className="align-items-center justify-content-center">Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <p>Date: {selectedJob.dateApplied}</p>
              <p>Company: {selectedJob.company}</p>
              <p>Position: {selectedJob.jobPosition}</p>
              <p>Currently: {selectedJob.status}</p>
              <p>URL: {selectedJob.url}</p>
              <p>Comments:<div>{selectedJob.comments}</div></p>
              <p>Salary: ${selectedJob.salary}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <BoardJobEdit />
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this job application?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => {
                confirmDelete(selectedJobIdToDelete);
                window.location.reload();
              }} > 
                Delete
              </Button>
            </Modal.Footer>
      </Modal>

    </Container>


  );
};

export default Board;
