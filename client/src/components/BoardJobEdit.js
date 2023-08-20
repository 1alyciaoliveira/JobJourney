import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_APPLICATION } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

function BoardJobEdit({job, onClose, context, userJobs, setUserJobs}) {
    const [updateJobApplication] = useMutation(UPDATE_APPLICATION);
    const { loading, error, data } = useQuery(QUERY_ME);
    const [showModal, setShowModal] = useState(true);
    const [reminder, setReminder] = useState(false);

    const [formData, setFormData] = useState({
        company: '',
        jobPosition: '',
        salary: '',
        comments: '',
        status: '',
        reminderDate: '',
    });

    useEffect(() => {
        if (job) {
            setFormData({
                company: job.company,
                jobPosition: job.jobPosition,
                salary: job.salary,
                comments: job.comments,
                status: job.status,
                reminderDate: job.reminderDate || '',
            });
        }
    }, [job]);

    const handleUpdateJobApplication = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const { company, jobPosition, salary, comments, status, reminderDate } = formData;

        console.log(context);

        if (!token) {
            return false;
        }

        try {
            const { data } = await updateJobApplication({
                variables: {
                    _id: job._id,
                    dateApplied: formData.dateApplied,
                    company: formData.company,
                    jobPosition: formData.jobPosition,
                    salary: formData.salary,
                    url: formData.url,
                    comments: formData.comments,
                    status: formData.status,
                    reminder: formData.reminder,
                    reminderDate: formData.reminderDate,
                    userID: formData.userID,

                },

            });

            console.log(job._id,
                formData.dateApplied,
                formData.company,
                formData.jobPosition,
               formData.salary,
                formData.url,
                formData.comments,
                formData.status,
                formData.reminder,
                formData.reminderDate,
                formData.userID);

            if (userJobs) { // Check if userJobs is defined
                const updatedUserJobs = userJobs.map((userJob) => {
                    if (userJob._id === job._id) {
                        return {
                            ...userJob,
                            company,
                            jobPosition,
                            salary,
                            comments,
                            status,
                            reminderDate,
                        };
                    } else {
                        return userJob;
                    }
                });

                console.log("this is updatedUserJobs:", updatedUserJobs);
    
                // Update the userJobs array in the local state
                setUserJobs(updatedUserJobs);
            }
            handleClose();
        } catch (err) {
            console.error(err);
        }
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

    const handleClose = () => {
        setShowModal(false);
        onClose();
    };

    return (
            <div>
                        <Form onSubmit={handleUpdateJobApplication}>
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
                        <Form.Group controlId="appliedDate">
                            <Form.Label>Job Application Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="appliedDate"
                                value={formData.appliedDate}
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
                        <Form.Group controlId="notes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="notes"
                                value={formData.notes}
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
                    <Modal.Footer className="justify-content-center bg-dmodal">
                        <Button variant="secondary" onClick={handleUpdateJobApplication}>
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>

            </div>
        );
    }


export default BoardJobEdit;