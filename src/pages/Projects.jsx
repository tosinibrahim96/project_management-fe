import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../services/projects";

const Projects = () => {
  const [projectsInfo, setProjectsInfo] = useState({});

  useEffect(() => {
    const getAllProjects = async () => {
      const allProjects = await getAll();
      if (allProjects.status) {
        setProjectsInfo(allProjects);
        console.log(allProjects);
      } else {
        console.log("info :>> ", allProjects.message);
      }
    };
    getAllProjects();
  }, []);

  if (projectsInfo.status) {
    const {
      data: { data: projects },
    } = projectsInfo;

    return projects.map((project) => (
      <div className="container" key={project.id}>
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Payment completed:{" "}
                    {`${Math.floor(
                      (project.last_payment.amount_received * 100) /
                        project.amount_expected
                    )} %`}{" "}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    {" "}
                    Task completed:{" "}
                    {project.total_tasks < 1
                      ? "No tasks yet"
                      : isNaN(
                          (project.completed_tasks * 100) / project.total_tasks
                        )
                      ? `0 %`
                      : `${Math.floor(
                          (project.completed_tasks * 100) / project.total_tasks
                        )} %`}{" "}
                  </small>
                </p>
                <Link
                  to={`/projects/${project.id}`}
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  } else {
    return <div>Loading</div>;
  }
};

export default Projects;
