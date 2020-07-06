import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/projects";
import { save } from "../services/tasks";
import { Button, Modal, Form, Toast } from "react-bootstrap";

const ProjectDetails = (props) => {
  const { projectId } = useParams();
  const [singleProjectInfo, setSingleProjectInfo] = useState({});
  const [show, setShow] = useState(false);
  const [newTaskSaved, setNewTaskSaved] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    project_id: projectId,
    status: "pending",
  });

  const [showErrorsToast, setShowErrorsToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newTaskData = {
      ...newTask,
      [name]: value,
    };

    setNewTask(newTaskData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();

    const response = await save(newTask);

    if (!response.status && response.message.errors) {
      setShowErrorsToast(true);
      const { errors } = response.message;

      return (
        <Toast
          onClose={() => setShowErrorsToast(false)}
          show={showErrorsToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{errors}</Toast.Body>
        </Toast>
      );
    } else if (!response.status) {
      setShowErrorToast(true);
      return (
        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{response.message}</Toast.Body>
        </Toast>
      );
    } else {
      console.log(response);
      setNewTaskSaved(true);
    }
  };

  useEffect(() => {
    const getSingleProject = async () => {
      const project = await getOne(projectId);
      if (project.status) {
        setSingleProjectInfo(project);
      } else {
        console.log("project :>> ", project.message);
      }
    };
    getSingleProject();
  }, [newTaskSaved, projectId]);

  if (singleProjectInfo.status) {
    const {
      data: { name, description, status, amount_expected, tasks, payments },
    } = singleProjectInfo;

    return (
      <div className="container">
        <h1>{name}</h1>
        <div>
          <div>Description:{description}</div>
          <div>Status:{status}</div>
          <div>Total payment expected:{amount_expected}</div>
        </div>
        <div>
          <div>
            <h2>Tasks</h2>
            <Button variant="primary" onClick={handleShow}>
              Add new task
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create a new task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Uber"
                      required
                      name="name"
                      onChange={handleInputChange}
                      value={newTask.name}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="American multinational ride-hailing company offering services that include peer-to-peer ridesharing"
                      required
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Project Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={newTask.status}
                      onChange={handleInputChange}
                      name="status"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In-progress</option>
                      <option value="done">Done</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length < 1 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan="2">
                    <h3>No tasks yet</h3>
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={task.id}>
                    <th scope="row">{++index}</th>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Payment History</h2>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Updated by</th>
                <th scope="col">Total amount received($)</th>
                <th scope="col">Date updated</th>
              </tr>
            </thead>
            <tbody>
              {payments.length < 1 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan="2">
                    <h3>No payments yet</h3>
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr key={payment.id}>
                    <th scope="row">{++index}</th>
                    <td>{payment.updated_by}</td>
                    <td>{payment.amount_received}</td>
                    <td>{`${new Date(payment.updated_at).getDate()}/${new Date(
                      payment.updated_at
                    ).getMonth()}/${new Date(
                      payment.updated_at
                    ).getFullYear()}`}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default ProjectDetails;
