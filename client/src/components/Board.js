import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import "../style/Board.css";
import BoardJobEdit from './BoardJobEdit';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_APPLICATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { CiFaceSmile } from 'react-icons/ci';

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
        await removeJobApplication({
          variables: { _id },
      })
        removeJobApplication(_id);
      } catch (err) {
        console.error(err);
      }
    };

  
const formatDate = (dateApplied) => {
  // Return a blank string if dateApplied is empty or falsy
  if (!dateApplied) {
    return ''; 
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
            <Card.Header style={{ backgroundColor: '#84a98c' }} className="column-header text-center card-font">Applied</Card.Header>
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
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'orange', backgroundColor: '',  }}>
                          <br/>
                          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', fontFamily: "'Bricolage Grotesque', sans-serif" }}>⏰ You set a reminder for today! </p>
                        </div>
                      )}
                      <br/>
                      <p className="card-text  card-font">Applied on <span className="font-weight-bold">{formatDate(job.dateApplied)}</span> to <span className="font-weight-bold">{job.company}</span> for the position of <span className="font-weight-bold">{job.jobPosition}</span>.</p>    
                      <p className="card-text card-font">The current status of this application is: <span className="font-weight-bold">{job.status}</span> </p>
                      <p className="card-text card-font  text-right fs-4">🔍</p>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className=" column-status my-3">
            <Card.Header style={{ backgroundColor: '#52796f' }} className="column-header text-center">In Progress</Card.Header>
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
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'orange', backgroundColor: '',  }}>
                        <br/>
                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', fontFamily: "'Bricolage Grotesque', sans-serif" }}>⏰ You set a reminder for today! </p>
                      </div>
                    )}
                    <br/>
                    <p className="card-text  card-font card-font">Applied on <span className="font-weight-bold">{formatDate(job.dateApplied)}</span> to <span className="font-weight-bold">{job.company}</span> for the position of <span className="font-weight-bold">{job.jobPosition}</span>.</p>    
                    <p className="card-text card-font">The current status of this application is: <span className="font-weight-bold">{job.status}</span> </p>
                    <p className="card-text card-font  text-right fs-4">🔍</p>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="column-status my-3">
            <Card.Header style={{ backgroundColor: '#354f52' }} className="column-header text-center card-font">Solved</Card.Header>
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
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'orange', backgroundColor: '',  }}>
                          <br/>
                          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', fontFamily: "'Bricolage Grotesque', sans-serif" }}>⏰ You set a reminder for today! </p>
                        </div>
                        )}
                        <br/>
                        <p className="card-text  card-font">Applied on <span className="font-weight-bold">{formatDate(job.dateApplied)}</span> to <span className="font-weight-bold">{job.company}</span> for the position of <span className="font-weight-bold">{job.jobPosition}</span>.</p>    
                        <p className="card-text card-font">The current status of this application is: <span className="font-weight-bold">{job.status}</span> </p>
                        <p className="card-text card-font  text-right fs-4">🔍</p>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className='justify-content-center bg-dmodal card-font'closeButton >
          <Modal.Title>Detailed Job Application</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {selectedJob && (
            <div>
              <p><span className="font-weight-bold card-font">Applied on: </span> {formatDate(selectedJob.dateApplied)}</p>
              <p><span className="font-weight-bold card-font">Company: </span> {selectedJob.company}</p>
              <p><span className="font-weight-bold card-font">URL: </span><a href={selectedJob.url} target="_blank" rel="noopener noreferrer">{selectedJob.url}</a></p>
              <p><span className="font-weight-bold card-font">Position: </span> {selectedJob.jobPosition}</p>
              <p><span className="font-weight-bold card-font">Status: </span> {selectedJob.status}</p>
              <p><span className="font-weight-bold card-font">Salary: </span> ${selectedJob.salary}</p>
              <p><span className="font-weight-bold card-font">Notes: </span><div>{selectedJob.comments}</div></p>
              <p><span className="font-weight-bold card-font">Reminder: </span>{selectedJob.reminderDate}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className='justify-content-center bg-dmodal card-font'>
          <BoardJobEdit selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton className="justify-content-center bg-warning card-font">
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center justify-content-center card-font" >
              Are you sure you want to delete this job application?
              <br/>
              <br/>
              <Button className="mr-2 bg-dmodal card-font" variant='dark' onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger card-font" onClick={() => {
                confirmDelete(selectedJobIdToDelete);
                window.location.reload();
              }} > 
                Delete
              </Button>
            </Modal.Body>

      </Modal>

    </Container>


  );
};

export default Board;
