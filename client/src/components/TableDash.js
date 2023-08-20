import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_APPLICATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import BoardJobEdit from './BoardJobEdit';
import Auth from '../utils/auth';

function TableDash() {

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

  const openModal = (job) => {
    setSelectedJobIdToDelete(job._id);
    setShowModal(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
    confirmDelete(selectedJobIdToDelete);
  };

  // Create a sorted copy of userJobs array
  const sortedUserJobs = [...userJobs].sort((jobA, jobB) =>
    jobA.status.localeCompare(jobB.status)
  );

  return (
    <div>
      <div className="container table-responsive">
        <h2>Job Applications</h2>
        <br/>
        <table className="table table-striped">
          <thead className="thead-dark text-center">
            <tr>
              <th>Company</th>
              <th>URL</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Reminder Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userJobs.map((selectedJob, index) => (
              <tr key={selectedJob._id} className="text-center">
                <td>{selectedJob.company}</td>
                <td>{selectedJob.url}</td>
                <td>{selectedJob.jobPosition}</td>
                <td>{selectedJob.salary}</td>
                <td>{selectedJob.comments}</td>
                <td>{selectedJob.status}</td>
                <td>{selectedJob.reminderDate}</td>
                <td>
                <BoardJobEdit selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
                  <Button
                    variant="danger btn-sm"
                    onClick={handleDelete}
                    
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}

export default TableDash;