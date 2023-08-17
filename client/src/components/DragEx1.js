import React from 'react';
import { useState } from 'react';
import Draggable from 'react-draggable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../style/Board.css";
import BoardJobEdit from './BoardJobEdit';


const Board = () => {
  const jobData = [
    {
      company: 'Company A',
      date: 'August 10, 2023',
      jobTitle: 'Web Developer',
      jobPosition: 'Frontend Engineer',
      status: 3,
      url: 'https://www.companya.com/web-developer',
      salary: 75000,
      interview: 'yes',
      comment: 'Exciting opportunity to shape user experiences!'
    },
    {
      company: 'Company B',
      date: 'August 12, 2023',
      jobTitle: 'Software Engineer',
      jobPosition: 'Full Stack Developer',
      status: 2,
      url: 'https://www.companyb.com/software-engineer',
      salary: 85000,
      interview: 'no',
      comment: 'Join a team working on cutting-edge technologies.'
    },
    {
      company: 'Company C',
      date: 'August 15, 2023',
      jobTitle: 'Data Analyst',
      jobPosition: 'Data Science Specialist',
      status: 1,
      url: 'https://www.companyc.com/data-analyst',
      salary: 65000,
      interview: 'yes',
      comment: 'Use data to uncover insights and drive decisions.'
    },
    {
      company: 'Company D',
      date: 'August 18, 2023',
      jobTitle: 'UX Designer',
      jobPosition: 'User Experience Specialist',
      status: 3,
      url: 'https://www.companyd.com/ux-designer',
      salary: 70000,
      interview: 'yes',
      comment: 'Shape digital products for optimal user satisfaction.'
    },
    {
      company: 'Company E',
      date: 'August 20, 2023',
      jobTitle: 'Mobile App Developer',
      jobPosition: 'App Development Engineer',
      status: 1,
      url: 'https://www.companye.com/mobile-app-developer',
      salary: 72000,
      interview: 'no',
      comment: 'Build innovative mobile applications to impact users.'
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };


  const status1Jobs = jobData.filter((job) => job.status === 1);
  const status2Jobs = jobData.filter((job) => job.status === 2);
  const status3Jobs = jobData.filter((job) => job.status === 3);

  const [job, setJobData] = useState(jobData);  // Initial job data here

  // ... your other code ...

  const handleDragEnd = (job, newStatus) => {
    const jobIndex = jobData.findIndex(j => j === job);

    const updatedJobData = [...jobData];
    updatedJobData[jobIndex] = { ...job, status: newStatus };

    setJobData(updatedJobData);
  };

  return (
    <Container fluid>
      
      <Row className="d-flex justify-content-around">
        <Col md={4}>
          <Card className="column-status my-3">
            <Card.Header className="column-header text-center">Applied</Card.Header>
            <Card.Body>
              {status1Jobs.map((job, index) => (
                <Draggable
                key={index}
                onStop={(event, data) => handleDragEnd(job, 1)}
              >
                <div
                  className="card inner-card my-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}
                >
                  <div key={index} className="card">
                    <div className="card-body">
                      <p className="card-text">Date: {job.date}</p>
                      <p className="card-text">Position: {job.jobPosition}</p>
                      <p className="card-text">Currently: {job.status}</p>
                    </div>
                  </div>
                </div>
                </Draggable>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className=" column-status my-3">
            <Card.Header className="column-header text-center">In Progress</Card.Header>
            <Card.Body>
              {status2Jobs.map((job, index) => (
                <Draggable>
                <div key={index}
                  className="card inner-card my-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}>
                  <div key={index} className="card">
                    <div className="card-body">
                      <p className="card-text">Date: {job.date}</p>
                      <p className="card-text">Position: {job.jobPosition}</p>
                      <p className="card-text">Currently: {job.status}</p>
                    </div>
                  </div>
                </div>
                </Draggable>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="column-status my-3">
            <Card.Header className="column-header text-center">Solved</Card.Header>
            <Card.Body>
              {status3Jobs.map((job, index) => (
                <Draggable>
                <div key={index}
                  className="card inner-card m-3"
                  onClick={() => openModal(job)}
                  style={{ cursor: 'pointer' }}>
                  <div key={index} className="card">
                    <div className="card-body">
                      <p className="card-text">Date: {job.date}</p>
                      <p className="card-text">Position: {job.jobPosition}</p>
                      <p className="card-text">Currently: {job.status}</p>
                      
                    </div>
                  </div>
                </div>
                </Draggable>
              ))}
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <p>Date: {selectedJob.date}</p>
              <p>Company: {selectedJob.company}</p>
              <p>Job: {selectedJob.jobTitle}</p>
              <p>Position: {selectedJob.jobPosition}</p>
              <p>Currently: {selectedJob.status}</p>
              <p>URL: {selectedJob.url}</p>
              <p>Comments: {selectedJob.comment}</p>
              <p>Salary: {selectedJob.salary}</p>
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