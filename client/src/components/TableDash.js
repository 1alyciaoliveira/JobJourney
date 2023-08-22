import React, { useState, useEffect } from 'react';
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_APPLICATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import BoardJobEdit from './BoardJobEdit';
import Auth from '../utils/auth';


function TableDash() {

  //Resizying style
  const [isIphone, setIsIphone] = useState(window.innerWidth <= 1199);
  const handleResize = () => {
      setIsIphone(window.innerWidth <= 1199);
  };

  useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedJobIdToDelete, setSelectedJobIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [removeJobApplication] = useMutation(REMOVE_APPLICATION);
  const [selectedJob, setSelectedJob] = useState(null);

  const { loading, error, data } = useQuery(QUERY_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.me;
  const userJobs = user.jobsApplied;

  const confirmDelete = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeJobApplication({
        variables: { _id },
        
      });

    
    } catch (err) {
      console.error(err);
    }
  };



  const handleDelete = (e, jobId) => {
    e.stopPropagation();
    setShowDeleteModal(true);
    setSelectedJobIdToDelete(jobId);
  };

  // Check if screen width is less than or equal to iPhone width
  if (isIphone) { 
    return (
      <div>
        <div>
          <br/>
        <div className="container card-font">
          <h2>Job Applications</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark text-center tfont">
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userJobs.map((selectedJob, index) => (
                  <tr key={selectedJob._id} className="text-center ">
                    <td className="tfont ">{selectedJob.company}</td>
                    <td className="tfont">{selectedJob.jobPosition}</td>
                    <td className="tfont">{selectedJob.status}</td>
                    <td className="tfont">
                      <div className="button-container2">
                        <BoardJobEdit selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
                        <Button
                          variant="danger card-font"
                          onClick={(e) => handleDelete(e, selectedJob._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>

    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header className="justify-content-center bg-warning" closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center justify-content-center">
            Are you sure you want to delete this job application?
            <br/>
            <br/>
            <Button className="mr-2 bg-dmodal" variant='dark' onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => {
              setShowDeleteModal(false);
              confirmDelete(selectedJobIdToDelete);
              window.location.reload();
            }} > 
              Delete
            </Button>
          </Modal.Body>

    </Modal>
  </div>
);

  } else {

  return (
    <div>
      <div className="container table-responsive card-font"> 
        <h2>Job Applications</h2>
        <br/>
        <table className="table table-striped ">
          <thead className="thead-dark text-center">
            <tr>
              <th>Company</th>
              <th>URL</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Applied on</th>
              <th>Reminder Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userJobs.map((selectedJob, index) => (
              <tr key={selectedJob._id} className="text-center">
                <td>{selectedJob.company}</td>
                <td className='tb-td' style={{ wordBreak: 'break-all'  }}>{selectedJob.url}</td>
                <td>{selectedJob.jobPosition}</td>
                <td>${selectedJob.salary}</td>
                <td className='tb-td' style={{  wordBreak: 'break-word' }}>{selectedJob.comments}</td>
                <td>{selectedJob.status}</td>
                <td>{selectedJob.dateApplied }</td>
                <td>{selectedJob.reminderDate }</td>
                <td className="button-cell">
                  <div className="button-container">
                    <BoardJobEdit selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
                    <Button
                      variant="danger card-font"
                      onClick={(e) => handleDelete(e, selectedJob._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header className="justify-content-center bg-warning" closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center justify-content-center">
              Are you sure you want to delete this job application?
              <br/>
              <br/>
              <Button className="mr-2 bg-dmodal" variant='dark' onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => {
                setShowDeleteModal(false);
                confirmDelete(selectedJobIdToDelete);
                window.location.reload();
              }} > 
                Delete
              </Button>
            </Modal.Body>

      </Modal>
    </div>
  );
}
}
export default TableDash;

