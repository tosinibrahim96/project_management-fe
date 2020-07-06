import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loader = () => {
  return (
    <Container>
      <Spinner
        style={{
          marginLeft: "50%",
          marginTop: "20%",
          width: "5rem",
          height: "5rem",
        }}
        animation="border"
        role="status"
      />
    </Container>
  );
};

export { Loader };
