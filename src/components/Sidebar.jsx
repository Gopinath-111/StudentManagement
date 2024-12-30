import React from "react";
import { useState  } from "react";
import { Nav, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaList, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    const [sidebarOpen] = useState(true);
    const handleLogout = () => {
        console.log("logout");
        localStorage.clear(); // Clear all stored data
        navigate("/");
    };
    return (
        <div className={`sidebar bg-light p-4 ${sidebarOpen ? "open" : "closed"}`}>
            <Row>
                <Col xs={12}>
                    <h4 className="mb-4 text-center">MENU</h4>
                </Col>
            </Row>
            <Nav className="flex-column">
            <Nav.Item className="mb-3">
                    <Link
                        to="/home"
                       className="nav-link d-flex align-items-center"
                    >
                        <FaHome className="me-2" /> HOMEPAGE
                    </Link>
                </Nav.Item>
                <Nav.Item className="mb-3">
                    <Link
                        to="/addstudent"
                        className="nav-link d-flex align-items-center"
                    >
                        <FaUser className="me-2" /> ADD STUDENTS
                    </Link>
                </Nav.Item>
                <Nav.Item className="mb-3">
                    <Link
                        to="/studentlist"
                        className="nav-link d-flex align-items-center"
                    >
                        <FaList className="me-2" /> STUDENTS LIST
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Button
                        variant="danger"
                        className="w-100 d-flex align-items-center"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="me-2" /> LOGOUT
                    </Button>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;
