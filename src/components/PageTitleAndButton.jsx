import React from "react";
import { Col, Row, Button } from "react-bootstrap";

const PageTitleAndButton = ({ pageTitle, buttonText, handleClick }) => {
  return (
    <Row className="mt-4">
      <Col md={8}>
        <h1>{pageTitle}</h1>
      </Col>
      <Col className="offset-md-2" md={2}>
        <Button
          className="btn btn-primary mt-1 ml-md-4"
          style={{ width: "82%" }}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
};

export { PageTitleAndButton };
