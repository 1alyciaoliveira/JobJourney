import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../style/Dashboard.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  const jobData = [
    {
      company: 'Company A',
      date: 'August 10, 2023',
      jobTitle: 'Web Developer',
      jobPosition: 'Frontend Engineer',
      status: 3
    },
    {
      company: 'Company B',
      date: 'August 12, 2023',
      jobTitle: 'Software Engineer',
      jobPosition: 'Full Stack Developer',
      status: 2
    },
    {
      company: 'Company C',
      date: 'August 15, 2023',
      jobTitle: 'Data Analyst',
      jobPosition: 'Data Science Specialist',
      status: 1
    },
    {
      company: 'Company D',
      date: 'August 18, 2023',
      jobTitle: ' UX Designer',
      jobPosition: ' User Experience Specialist',
      status: 3
    },
    {
      company: 'Company E',
      date: 'August 20, 2023',
      jobTitle: 'Mobile App Developer',
      jobPosition: 'App Development Engineer',
      status: 1
    }
  ];

  const status1Jobs = jobData.filter((job) => job.status === 1);
  const status2Jobs = jobData.filter((job) => job.status === 2);
  const status3Jobs = jobData.filter((job) => job.status === 3);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-around">
        <Col md={4}>
          <Card className="kanban-column column-status">
            <Card.Header className="column-header text-center">Applied</Card.Header>
            <Card.Body>
              {status1Jobs.map((job, index) => (
                <div key={index} className="card">
{/*                   <div className="card-header font-weight-bold text-center">
                    Status: {job.status}
                  </div> */}
                  <div className="card-body">
                    <p className="card-text">Date: {job.date}</p>
                    <p className="card-text">Job: {job.jobTitle}</p>
                    <p className="card-text">Position: {job.jobPosition}</p>
                    <p className="card-text">Currently: {job.status}</p>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="kanban-column column-status">
            <Card.Header className="column-header text-center">In Progress</Card.Header>
            <Card.Body>
              {status2Jobs.map((job, index) => (
                <div key={index} className="card">
{/*                   <div className="card-header font-weight-bold text-center">
                    Status: {job.status}
                  </div> */}
                  <div className="card-body">
                    <p className="card-text">Date: {job.date}</p>
                    <p className="card-text">Company: {job.company}</p>
                    <p className="card-text">Position: {job.jobPosition}</p>
                    <p className="card-text">Currently: {job.status}</p>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="kanban-column column-status">
            <Card.Header className="column-header text-center">Solved</Card.Header>
            <Card.Body>
              {status3Jobs.map((job, index) => (
                <div key={index} className="card">
{/*                   <div className="card-header font-weight-bold text-center">
                    Status: {job.status}
                  </div> */}
                  <div className="card-body">
                    <p className="card-text">Date: {job.date}</p>
                    <p className="card-text">Job: {job.jobTitle}</p>
                    <p className="card-text">Position: {job.jobPosition}</p>
                    <p className="card-text">Currently: {job.status}</p>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;