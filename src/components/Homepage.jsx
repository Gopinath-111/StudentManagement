import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../assets/css/Homepage.css";

function HomePage  ()  {
    const navigate = useNavigate();
    const  name  = localStorage.getItem("createdBy"); // Default name fallback
    // Sidebar toggle state
    
    const currentDateTime = new Date().toLocaleString();
    // Redirect to login page if the user is not authenticated
    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            navigate("/");
        }
    }, [navigate]);

    // Logout handler
    
    return (
        <div className="homepage-wrapper d-flex">
            {/* Sidebar */}
            <Sidebar
            />
            {/* Main Content */}
            <div className="content flex-grow-1 p-4">
                <Container fluid>
                    <Row className="header">
                        <h4 className="text-center mb-2 mt-2">ADMIN DASHBOARD</h4>
                    </Row>
                    {/* Add more content here */}
                </Container>
                <Container>
                    <div>
                        <h1>Welcome! {name}</h1>
                        <p>Today is: {currentDateTime}</p>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HomePage;
