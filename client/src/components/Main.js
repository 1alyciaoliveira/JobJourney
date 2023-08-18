import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button, Modal, Form } from 'react-bootstrap'; // Import React Bootstrap components
import { QUERY_ME } from '../utils/queries'
import { useQuery } from '@apollo/client';

import { useMutation } from '@apollo/client';
import { ADD_APPLICATION } from '../utils/mutations';

const Main = () => {
    const [showModal, setShowModal] = useState(false);
    const [reminder, setReminder] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        dateApplied:'',
        company: '',
        jobPosition: '',
        salary: '',
        url: '',
        interview: '',
        interviewDate: '',
        comments: '',
        status: '',
        reminder: true,
        reminderDate: '',
        userID: '',
    });

    const { loading, data } = useQuery(QUERY_ME);
console.log(data);
    // const jobsApplied = data?.jobCount || []

    const jobsAppliedCount = data?.me.jobsApplied.length || []

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [invalidInput, setInvalidInput] = useState({});
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        
        // Validate and set value as an integer
        const newInvalidInput = { ...invalidInput };
        
        if (name === "salary" || name === "anyOtherIntegerField") {
            // if (!isNaN(value) && Number.isInteger(Number(value))) {
            if (!isNaN(value)) {
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

        // Validate reminder date is not <= today
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

    const [addJobApplication] = useMutation(ADD_APPLICATION);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); 
        addJobApplication({
            variables: {
                // InputJobApplication: {
                //     dateApplied: formData.dateApplied,
                //     company: formData.company,
                //     jobPosition: formData.jobPosition,
                //     salary: formData.salary,
                //     url: formData.url,
                //     comments: formData.comments,
                //     status: formData.status,
                //     reminder: formData.reminder,
                //     reminderDate: formData.reminderDate,
                    
                // },
                _id: formData._id,
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
                }
            })
                .then(({ data }) => {
                // Do something with the response data if needed
                console.log(data);
                handleClose();
                })
                .catch((error) => {
                // Handle errors here
                console.error(error);
            });
        };

    return (
        <div className="container-fluid bg-dmain py-4">
            <div className="d-flex justify-content-between mb-3">
                <div className="rounded p-3 bg-light text-center">
                {/* <img src={totalJobApplicationsImage} alt="Total Job Applications" width="50" height="50" /> */}
                <p className="m-0">Total Job Applications:{jobsAppliedCount}</p>
                </div>
                <div className="rounded p-3 bg-light text-center">
                {/* <img src={interviewsRatioImage} alt="Interviews Ratio" width="50" height="50" /> */}
                <p className="m-0">Interviews Ratio:</p>
                </div>
                <div className="rounded p-3 bg-light text-center">
                {/* <img src={pendingInterviewsImage} alt="Pending Interviews" width="50" height="50" /> */}
                <p className="m-0">Pending Interviews:</p>
                </div>
                <div>
                <Button className= "rounded p-3 text-center" variant= "success" onClick={handleShow}>
                + Add Job
            </Button>
                </div>
            </div>

            

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton className="justify-content-center bg-dmodal">
                    <Modal.Title>Add Job Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
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
                        type="text"
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
                    <br/>
                    <Form.Group controlId="reminder">
                        <Form.Check
                        type="checkbox"
                        label="Set Reminder?"
                        name="reminder"
                        checked={reminder}
                        onChange={(e) => setReminder(e.target.checked)}
                        />
                    </Form.Group>
                    <br/>
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
                <Modal.Footer className="justify-content-center bg-dmodal">
                    <Button variant="warning" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Main;