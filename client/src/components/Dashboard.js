import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Dashboard = () => {
  const jobData = [
    {
      company: 'Company A',
      date: 'August 10, 2023',
      jobTitle: 'Web Developer',
      jobPosition: 'Frontend Engineer',
    },
    {
      company: 'Company B',
      date: 'August 12, 2023',
      jobTitle: 'Software Engineer',
      jobPosition: 'Full Stack Developer',
    },
    {
      company: 'Company C',
      date: 'August 15, 2023',
      jobTitle: 'Data Analyst',
      jobPosition: 'Data Science Specialist',
    },
    {
      company: 'Company D',
      date: 'August 18, 2023',
      jobTitle: ' UX Designer',
      jobPosition: ' User Experience Specialist',
    },
    {
      company: 'Company E',
      date: 'August 20, 2023',
      jobTitle: 'Mobile App Developer',
      jobPosition: 'App Development Engineer',
    },
/*     {
      company: 'Company C',
      date: 'August 22, 2023',
      jobTitle: ' DevOps Engineer',
      jobPosition: 'Infrastructure Specialist',
    } */
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {jobData.map((job, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header font-weight-bold">{job.company}</div>
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
