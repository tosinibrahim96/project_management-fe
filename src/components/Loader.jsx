import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loader = () => {
  return (
    <Container>
      <Spinner
        style={{
          marginLeft: "50%",
          marginTop: "20%",
          width: "2rem",
          height: "2rem",
        }}
        animation="border" variant="primary"
        role="status"
      />
    </Container>
  );
};

export { Loader };
