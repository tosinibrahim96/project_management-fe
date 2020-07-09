import React from "react";
import { Col, Row, Table } from "react-bootstrap";

const TaskTable = ({ projectDetails }) => {
  return (
    <Row className="mt-4">
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projectDetails.tasks.length < 1 ? (
              <tr>
                <td></td>
                <td></td>
                <td colSpan="2">
                  <h3>No tasks yet</h3>
                </td>
              </tr>
            ) : (
              projectDetails.tasks.map((task, index) => (
                <tr key={task.id}>
                  <th scope="row">{++index}</th>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export { TaskTable };
