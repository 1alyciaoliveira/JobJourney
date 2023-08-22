import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Card, Button, Modal, Form } from 'react-bootstrap'; // Import React Bootstrap components
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

import { useMutation } from '@apollo/client';
import { ADD_APPLICATION } from '../utils/mutations';

const Main = () => {

    //Resizying style
    const [isIphone, setIsIphone] = useState(window.innerWidth <= 992);
    const handleResize = () => {
        setIsIphone(window.innerWidth <= 992);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //We fetch the data from the DB using this query
    const { loading, data } = useQuery(QUERY_ME);
    const [showModal, setShowModal] = useState(false);
    const [showMissingFieldsModal, setShowMissingFieldsModal] = useState(false);
    const [missingFields, setMissingFields] = useState([]); // Define missingFields state

    const [reminder, setReminder] = useState(false);
    const [meData, setMeData] = useState({});
    const [formData, setFormData] = useState({ _id: '', dateApplied: '', company: '', jobPosition: '', salary: '', url: '', interview: false, interviewDate: '', comments: '', status: '', reminder: true, reminderDate: '', userID: '', });
    const [invalidInput, setInvalidInput] = useState({});

    // Mutations that will be used on the main page and triggered by submitForm events.
    const [addJobApplication] = useMutation(ADD_APPLICATION);

    const [jobCounter, setJobCount] = useState(0);
    const [interviewCounter, setInterviewCount] = useState(0);
    const [interviewRatioState, setInterviewRatio] = useState(0);
    const [pendingInterviewsState, setPendingInterviews] = useState(0);
    const [averageSalary, setAverageSalary] = useState(0);

    // we use the useEffect hook so that the page waits until the data from the query has been retrieved, then stores it on meData.
    useEffect(() => {
        if (!loading) {
            const fetchedMeData = data?.me || {};

            // Update the state variables based on fetched data
            setMeData(fetchedMeData);
            setJobCount(fetchedMeData.jobCount);
            setInterviewCount(fetchedMeData.jobsApplied.filter(job => job.interview).length);
            setInterviewRatio((interviewCounter / jobCount).toFixed(2));
            setPendingInterviews(jobCount - interviewCounter);
            
            const validSalaries = fetchedMeData.jobsApplied.filter(application => application.salary !== "" && application.salary !== null).map(application => Number(application.salary));
            const totalSalaries = validSalaries.reduce((sum, salary) => sum + salary, 0);
            const avgSalary = validSalaries.length > 0 ? totalSalaries / validSalaries.length : 0;
            const formattedAvgSalary = avgSalary.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            setAverageSalary(formattedAvgSalary);
        }
    }, [loading, data]);

    const jobCount = meData.jobCount;
    

    
    const interviewRatio = jobCount !== 0 ? (interviewCounter / jobCount).toFixed(2) : 0


    const pendingInterviews = jobCount - interviewCounter;


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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

    if (formData.status === 'Interview') {
        formData.interview = true
    } else {
        formData.interview = false
    }

    const handleCloseMissingFieldsModal = () => {
        setShowMissingFieldsModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        

        // Check if all mandatory fields are filled out
        const mandatoryFields = ['company', 'jobPosition', 'dateApplied', 'status'];
        const missingFields = mandatoryFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            setShowMissingFieldsModal(true);
            return;
        }

        addJobApplication({
            variables: {
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
                interview: formData.interview
            }
        })
            .then(({ data }) => {
                // Do something with the response data if needed
                
                handleClose();
                window.location.reload();
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    };




    if (loading) {
        return <p>Loading....</p>
    }

    const styles = {
        indicatorsCards: {
            color: 'green',
            display: 'flex',
            flexDirection: 'Column',
            fontWeight: 'bold',
            fontFamily: "'Bricolage Grotesque', sans-serif"
        },
    }

    // Check if screen width is less than or equal to iPhone width
    if (isIphone) {
        return (
        <div className="container-fluid bg-dmain py-4">
            <h2 className="mb-3 ml-4 text-center fs-sm-12 card-font">
                Welcome <span style={{ color: '#84a98c', fontWeight: 'bold' }}>{meData.username}</span>, let's track your job applications!
            </h2>

            <div className="d-flex flex-wrap justify-content-center mb-3">
                <div className="col-md-4 col-lg-3 rounded p-3 bg-light text-center m-2 ">
                    <p className="m-0 fs-6 fs-sm-12">Total Job Applications<br /><span style={styles.indicatorsCards}>{jobCount}</span></p>
                </div>
                <div className="col-md-4 col-lg-3 rounded p-3 bg-light text-center m-2 ">
                    <p className="m-0 fs-6 fs-sm-12">Waiting for Interview<br /><span style={styles.indicatorsCards}>{pendingInterviews}</span></p>
                </div>
                <div className="col-md-4 col-lg-3 rounded p-3 bg-light text-center m-2 ">
                    <p className="m-0 fs-6 fs-sm-12">Interview Ratio<br /><span style={styles.indicatorsCards}>{interviewRatio}</span></p>
                </div>
                <div className="col-md-4 col-lg-3 rounded p-3 bg-light text-center m-2">
                    <p className="m-0 fs-6 fs-sm-12">Avg. Salary Expectation<br /><span style={styles.indicatorsCards}>$ {averageSalary}</span></p>
                </div>
                <div className="col-12 text-center mt-2">
                    <Button className="rounded p-3 text-center card-font" variant="success" onClick={handleShow}>
                        + Add Job
                    </Button>
            </div>
        </div>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton className="justify-content-center bg-dmodal card-font">
                <Modal.Title>Add Job Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='card-font' onSubmit={handleSubmit}>
                    <Form.Group controlId="company">
                        <Form.Label> <span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Company</Form.Label>
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
                        <Form.Label><span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Job Position</Form.Label>
                        <Form.Control
                            type="text"
                            name="jobPosition"
                            value={formData.jobPosition}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="dateApplied">
                        <Form.Label><span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Job Application Date</Form.Label>
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
                        <Form.Label><span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Status</Form.Label>
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
                <Button variant="warning" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Modal for displaying missing mandatory fields */}
        <Modal show={showMissingFieldsModal} onHide={handleCloseMissingFieldsModal} >
            <Modal.Header closeButton className="justify-content-center bg-danger">
                <Modal.Title>Required Fields</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center justify-content-center" >
                <br />
                <p>⚠️ Please fill out all mandatory fields</p>
                <br />

                <Button className="mr-2 bg-dmodal" variant='dark' onClick={handleCloseMissingFieldsModal}>
                    OK
                </Button>
            </Modal.Body>


        </Modal>
    </div>
);
    } else {
        return (
            <div className="container-fluid bg-dmain py-4">
                <h2 className="mb-5 ml-4 text-center fs-sm-12 card-font">
                Welcome <span style={{ color: '#84a98c', fontWeight: 'text-bold' }}> {meData.username} </span>, let's track your job applications!
                </h2>
    
                <div className="d-flex flex-wrap justify-content-around mb-3 card-font">
                    <div className="col-md-2 col-lg-2 rounded p-3 bg-light text-center m-2">
                        
                        <p className="m-0 fs-4 fs-sm-12">Total Job Applications  <span style={styles.indicatorsCards}>{jobCount}</span></p>
                    </div>
                    <div className="col-md-4 col-lg-2 rounded p-3 bg-light text-center m-2">
                        
                        <p className="m-0 fs-4 fs-sm-12">Waiting for Interview <span style={styles.indicatorsCards}>{pendingInterviews}</span></p>
                    </div>
                    <div className="col-md-4 col-lg-2 rounded p-3 bg-light text-center m-2 ">
                        
                        <p className="m-0 fs-4 fs-sm-12">Interview Ratio <span style={styles.indicatorsCards}>{interviewRatio}</span></p>
                    </div>
                    <div className="col-md-4 col-lg-2 rounded p-3 bg-light text-center m-2">
                        
                        <p className="m-0 fs-4 fs-sm-12">Avg. Salary Expectation<span style={styles.indicatorsCards}>$ {averageSalary}</span></p>
                    </div>
                    <div>
                        <br/>
                        <br/>
                        <Button className="rounded p-3 text-center mb-2 card-font" variant="success card-font" onClick={handleShow}>
                            + Add Job
                        </Button>
                    </div>
                </div>
    
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton className="justify-content-center bg-dmodal card-font">
                        <Modal.Title>Add Job Application</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='card-font' onSubmit={handleSubmit}>
                            <Form.Group controlId="company">
                                <Form.Label> <span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Company</Form.Label>
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
                                <Form.Label><span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Job Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="jobPosition"
                                    value={formData.jobPosition}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="dateApplied">
                                <Form.Label><span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Job Application Date</Form.Label>
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
                                <Form.Label><span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Status</Form.Label>
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
                        <Button variant="warning" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
    
                {/* Modal for displaying missing mandatory fields */}
                <Modal show={showMissingFieldsModal} onHide={handleCloseMissingFieldsModal} >
                    <Modal.Header closeButton className="justify-content-center bg-danger">
                        <Modal.Title>Required Fields</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center justify-content-center" >
                        <br />
                        <p>⚠️ Please fill out all mandatory fields</p>
                        <br />
    
                        <Button className="mr-2 bg-dmodal" variant='dark' onClick={handleCloseMissingFieldsModal}>
                            OK
                        </Button>
                    </Modal.Body>
    
    
                </Modal>
            </div>
        );
    }

};

export default Main;


