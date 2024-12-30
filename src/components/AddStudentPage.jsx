import React, { useEffect, useState } from "react";
import { Container, Row, Form, Col, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaCalendar } from "react-icons/fa";
import "../assets/css/Form.css";
import Sidebar from "./Sidebar";
import { addApi } from "./Api.jsx";
import NotificationModal from "./NotificationModal.jsx";

function AddStudentPage  ()  {
    const navigate = useNavigate();

    // State management for student data
    const [studentData, setStudentData] = useState({
        name: "",
        fatherName: "",
        dateofBirth: "",
        mobileNo: "",
        createdBy: localStorage.getItem("createdBy") || "",
    });

    // Modal state for notifications
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Modal handlers
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            navigate("/");
        }
    }, [navigate]);

    // Input change handler with validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update state
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Validation function
const validateInput = (name, value) => {
    if (name === "name" || name === "fatherName") {
        const nameRegex = /^[A-Za-z\s]*$/;
        if (!nameRegex.test(value)) {
            return `${name === "name" ? "Student" : "Father's"} Name can only contain alphabets and spaces.`;
        }
    } else if (name === "mobileNo") {
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(value)) {
            return "Please enter a valid 10-digit mobile number.";
        }
    }
    return null; // Return null if validation passes
};

// Form submission handler
const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, fatherName, dateofBirth, mobileNo } = studentData;
    // Check for empty fields
    if (!name || !fatherName || !dateofBirth || !mobileNo) {
        handleShowModal("Please fill in all fields.");
        return;
    }
    // Validate each input
    let errorMessage = validateInput("name", name);
    if (!errorMessage) errorMessage = validateInput("fatherName", fatherName);
    if (!errorMessage) errorMessage = validateInput("mobileNo", mobileNo);
    if (errorMessage) {
        handleShowModal(errorMessage);
        return;
    }
    // API submission
    const accesstoken = localStorage.getItem("accesstoken");
        const response = await addApi("Student/AddStudent", studentData, accesstoken);
        if (response) {
            handleShowModal(response.message); // Show success message
        } else {
            handleShowModal(response.errors || "An error occurred. Please try again.");
        }
};


    return (
        <div className="d-flex">
            <NotificationModal show={showModal} onHide={handleCloseModal} modalMessage={modalMessage} />
            <Sidebar />
            <Container fluid className="form-container p-4 flex-grow-1">
                <Row className="mb-3">
                    <h3 className="text-center">STUDENT ENTRY FORM</h3>
                </Row>
                <div className="form">
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            {/* Student Name */}
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col md={4}>
                                        <Form.Label>Student Name</Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaUser />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter Student Name"
                                                value={studentData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form.Group>

                            {/* Father's Name */}
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col md={4}>
                                        <Form.Label>Father's Name</Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaUser />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                name="fatherName"
                                                placeholder="Enter Father's Name"
                                                value={studentData.fatherName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form.Group>

                            {/* Date of Birth */}
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col md={4}>
                                        <Form.Label>Date of Birth</Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaCalendar />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="date"
                                                name="dateofBirth"
                                                value={studentData.dateofBirth}
                                                onChange={handleChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form.Group>

                            {/* Mobile Number */}
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col md={4}>
                                        <Form.Label>Mobile No</Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaPhone />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="tel"
                                                name="mobileNo"
                                                placeholder="Enter Mobile No"
                                                value={studentData.mobileNo}
                                                onChange={handleChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form.Group>

                            {/* Submit Button */}
                            <div className="text-center">
                                <Button type="submit" className="w-50">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default AddStudentPage;
