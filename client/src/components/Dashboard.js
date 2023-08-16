import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../style/Dashboard.css";


/* 
  input InputJobApplication {
    jobId: String
    dateApplied: String
    company: String
    jobPosition: String
    salary: Int
    url: String
    interview: Boolean
    interviewDate: String
    comments: String
    status: String
    reminder: Boolean
    reminderDate: String
  } */

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
    },
/*     {
      company: 'Company C',
      date: 'August 22, 2023',
      jobTitle: ' DevOps Engineer',
      jobPosition: 'Infrastructure Specialist',
    } */
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return 'bg-success opacity-75'; // Green
      case 2:
        return 'bg-primary opacity-75'; // Blue
      case 3:
        return 'bg-warning '; // Orange
      default:
        return 'bg-light'; // Default color
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {jobData.map((job, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className={` card ${getStatusColor(job.status)}`}>
              <div className="card-header font-weight-bold text-center">
                Status: {job.status}
              </div>
              <div className="card-body">
                <p className="card-text">Date: {job.date}</p>
                <p className="card-text">Job: {job.jobTitle}</p>
                <p className="card-text">Position: {job.jobPosition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
