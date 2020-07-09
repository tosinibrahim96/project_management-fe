import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import {
  PageTitleAndButton,
  ModalContainer,
  TaskTable,
  FormInput,
  Loader,
} from "./index";
import { useCreateNewTask } from "../services/tasks/tasksState";

const TaskSection = ({ projectDetails }) => {
  const [showAddTaskModal, setshowAddTaskModal] = useState(false);
  const [newTaskState, createTask] = useCreateNewTask();
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    project_id: projectDetails.id,
    status: "pending",
  });

  const handleCloseAddTask = () => setshowAddTaskModal(false);
  const handleShowAddTask = () => setshowAddTaskModal(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    createTask(newTask);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newProjectData = {
      ...newTask,
      [name]: value,
    };

    setNewTask(newProjectData);
  };

  const showErrors = () => {
    const errorValue = newTaskState.error;

    if (errorValue === "") {
      return <></>;
    }

    if (errorValue !== "" && errorValue.message.errors) {
      return (
        <ListGroup>
          {errorValue.message.errors.map((error) => (
            <ListGroup.Item variant="danger" key={error} className="mt-2 mb-2">
              {error}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }

    if (errorValue !== "" && errorValue.message) {
      return (
        <ListGroup>
          <ListGroup.Item variant="danger" className="mb-2">
            {errorValue.message}
          </ListGroup.Item>
        </ListGroup>
      );
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return newTaskState.taskDetails.status ? (
    refreshPage()
  ) : (
    <>
      <PageTitleAndButton
        pageTitle="Tasks"
        buttonText="New task"
        headerSize={3}
        topMargin={5}
        handleClick={handleShowAddTask}
      />

      <TaskTable projectDetails={projectDetails} />

      <ModalContainer
        handleShow={showAddTaskModal}
        handleClose={handleCloseAddTask}
        title="Create a new task"
        footer={false}
      >
        {showErrors()}
        {newTaskState.loading ? (
          <Loader />
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              placeholder="New task"
              required={true}
              name="name"
              handleChange={handleInputChange}
              value={newTask.name}
              label="Task Name"
            />
            <FormInput
              type="textarea"
              placeholder="Description of the new task"
              required={true}
              name="description"
              handleChange={handleInputChange}
              value={newTask.description}
              rows="3"
              label="Task Description"
            />
            <Form.Group>
              <Form.Label>Task status</Form.Label>
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
        )}
      </ModalContainer>
    </>
  );
};

export { TaskSection };
