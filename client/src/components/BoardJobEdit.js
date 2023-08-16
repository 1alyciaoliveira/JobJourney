import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function BoardJobEdit() {
    const [showModal, setShowModal] = useState(false);
    const [reminder, setReminder] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        jobPosition: '',
        salary: '',
        comments: '',
        status: '',
        reminderDate: '',
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleClose();
    };

    return (
        <div>

            <Button className="bg-dheader" variant="secondary" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton className="justify-content-center bg-dmodal">
                    <Modal.Title>Edit Job Application</Modal.Title>
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
                </Modal.Body>
                <Modal.Footer className="justify-content-center bg-dmodal">
                    <Button variant="secondary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default BoardJobEdit;