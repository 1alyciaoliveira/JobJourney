import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_APPLICATION } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

function BoardJobEdit({selectedJob, setSelectedJob}) {
    const [updateJobApplication] = useMutation(UPDATE_APPLICATION);
    const { loading, error } = useQuery(QUERY_ME);
    const [showModal, setShowModal] = useState(false);
    const [reminder, setReminder] = useState(false);

    const [formData, setFormData] = useState({
        company: selectedJob.company,
        url: selectedJob.url,
        dateApplied: selectedJob.dateApplied,
        jobPosition: selectedJob.jobPosition,
        salary: selectedJob.salary,
        comments: selectedJob.comments,
        status: selectedJob.status,
        reminderDate: selectedJob.reminderDate,
        interview: selectedJob.interview,
    });

    const handleUpdateJobApplication = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        let { company, url, dateApplied, jobPosition, salary, comments, status, reminderDate, interview } = formData;

        if (!token) {
            return false;
        }
        if (status === 'Interview' || 'Accepted') {
            interview = true
        } else {
            interview = false
        }

        try {
            const { data } = await updateJobApplication({
                variables: {
                    _id: selectedJob._id,
                    url,
                    dateApplied,
                    company,
                    jobPosition,
                    salary,
                    comments,
                    status,
                    reminderDate,
                    interview
                },
            });
            handleClose();
            window.location.reload();
            console.log(data);
            console.log(formData);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelectJob = (job) => {
        // setSelectedJob(job);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedJob({
            _id: formData._id,
            url: formData.url,
            dateApplied: formData.dateApplied,
            company: formData.company,
            jobPosition: formData.jobPosition,
            salary: formData.salary,
            comments: formData.comments,
            status: formData.status,
            reminderDate: formData.reminderDate,
            interview: formData.interview,
        });
        setFormData({
            company: '',
            url: '',
            dateApplied: '',
            jobPosition: '',
            salary: '',
            comments: '',
            status: '',
            reminderDate: '',
        });
    };

    const [invalidInput, setInvalidInput] = useState({});
    const handleFormChange = (e) => {
        const { name, value } = e.target;

        const newInvalidInput = { ...invalidInput };

        if (name === "salary" || name === "anyOtherIntegerField") {
            if (!isNaN(value) && Number.isInteger(Number(value))) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                newInvalidInput[name] = false;
            } else {
                newInvalidInput[name] = true;
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        setInvalidInput(newInvalidInput);
        if (name === 'reminderDate' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set the time to midnight
            if (selectedDate <= today) {
                // Prevent selecting a date that is today or before today
                return;
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div >
            {/* {userJobs.map((job) => ( */}
                <div key={selectedJob._id}>
            <Button variant="warning card-font" onClick={() =>handleSelectJob(selectedJob)}>
                Edit
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton className="justify-content-center bg-dmodal card-font">
                    <Modal.Title>Edit Job Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='card-font' onSubmit={handleUpdateJobApplication}>
                        <Form.Group controlId="company">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="url">
                            <Form.Label>Company URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="jobPosition">
                            <Form.Label>Job Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobPosition"
                                value={formData.jobPosition}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="dateApplied">
                            <Form.Label>Job Application Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateApplied"
                                value={formData.dateApplied}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="salary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleFormChange}
                            />
                            {invalidInput.salary && <div className="text-danger">Please enter a valid number</div>}
                        </Form.Group>
                        <Form.Group controlId="comments">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                type="text"
                                name="comments"
                                value={formData.comments}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleFormChange}
                            >
                                <option></option>
                                <option>Applied</option>
                                <option>Interview</option>
                                <option>Waiting for response</option>
                                <option>Job Offer</option>
                                <option>Accepted</option>
                                <option>Rejected by Company</option>
                                <option>Rejected by Me</option>
                            </Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="reminder">
                            <Form.Check
                                type="checkbox"
                                label="Set Reminder?"
                                name="reminder"
                                checked={reminder}
                                onChange={(e) => setReminder(e.target.checked)}
                            />
                        </Form.Group>
                        <br />
                        {reminder && (
                            <Form.Group controlId="reminderDate">
                                <Form.Label>Reminder Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="reminderDate"
                                    value={formData.reminderDate}
                                    onChange={handleFormChange}
                                    min={new Date().toISOString().split('T')[0]} // Set the min attribute to today's date
                                />
                            </Form.Group>
                        )}
                        <br />
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center bg-dmodal card-font">
                    <Button variant="secondary card-font" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="warning card-font" onClick={handleUpdateJobApplication}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
    );

}

export default BoardJobEdit;