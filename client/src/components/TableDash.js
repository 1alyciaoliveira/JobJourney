import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_APPLICATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';

function TableDash() {

  const [showModal, setShowModal] = useState(false);
  const [selectedJobIdToDelete, setSelectedJobIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [removeJobApplication] = useMutation(REMOVE_APPLICATION);

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
            {userJobs.map((job, index) => (
              <tr key={job._id} className="text-center">
                <td>{job.company}</td>
                <td>{job.url}</td>
                <td>{job.jobPosition}</td>
                <td>{job.salary}</td>
                <td>{job.comments}</td>
                <td>{job.status}</td>
                <td>{job.reminderDate}</td>
                <td>
                  <Button
                      variant="dark btn-sm mr-2"
                      onClick={() => openModal(job)}
                    >
                      Edit
                  </Button>
                  <Button
                    variant="danger btn-sm"
                    onClick={() => openModal(job)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        id="delModal"
        className="modal fade"
        role="dialog"
      >
        {/* Delete Modal */}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete Job Application</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete this job application?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                id="confirmDel"
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                id="cancelDel"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableDash;