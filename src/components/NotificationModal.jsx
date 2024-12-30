import React from "react";
import { Modal, Button } from "react-bootstrap";

function NotificationModal({ show, onHide, modalMessage }) {
      return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ modalMessage }</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NotificationModal;
