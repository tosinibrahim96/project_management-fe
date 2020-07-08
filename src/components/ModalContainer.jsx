import React from "react";
import { Modal } from "react-bootstrap";

const ModalContainer = ({ children, handleShow, handleClose, title }) => {
  return (
    <Modal show={handleShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export { ModalContainer };
