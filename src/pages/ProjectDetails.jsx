import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/projects";
import { save } from "../services/tasks";
import { Button, Modal, Form, Toast } from "react-bootstrap";

const ProjectDetails = (props) => {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Project detail: {projectId}</h1>
    </div>
  );
};

export default ProjectDetails;
