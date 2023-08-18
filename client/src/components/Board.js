import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import "../style/Board.css";
import BoardJobEdit from './BoardJobEdit';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


const Board = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.me;
  const userJobs = user.jobsApplied;

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
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
                <div key={index}
                  className="card inner-card my-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}>
                  <div key={index} className="card">
                    <div className="card-body">
                      <p className="card-text">Date: {job.interviewDate}</p>
                      <p className="card-text">Position: {job.jobPosition}</p>
                      <p className="card-text">Status: {job.status}</p>
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
                <div key={index}
                  className="card inner-card my-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}>
                  <div key={index} className="card">
                    <div className="card-body">
                      <p className="card-text">Date: {job.interviewDate}</p>
                      <p className="card-text">Position: {job.jobPosition}</p>
                      <p className="card-text">Status: {job.status}</p>
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
                <div key={index}
                  className="card inner-card m-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}>
                  <div key={index} className="card">
                    <div className="card-body">
                      <p className="card-text">Date: {job.interviewDate}</p>
                      <p className="card-text">Position: {job.jobPosition}</p>
                      <p className="card-text">Status: {job.status}</p>
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
              <p>Date: {selectedJob.interviewDate}</p>
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
        </Modal.Footer>
      </Modal>
    </Container>


  );
};

export default Board;