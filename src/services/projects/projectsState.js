import { useEffect, useReducer } from "react";
import { getAll,save } from "./projectRequests";

const initialState = {
  loading: true,
  error: "",
  projectsDetails: {},
};

const createProjectInitialState = {
  loading: false,
  error: "",
  projectsDetails: {},
};

const getAllProjectsReducer = (state, action) => {
  switch (action.type) {
    case "ALLPROJECTS_DATA_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ALLPROJECTS_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        projectsDetails: action.payload,
      };
    case "ALLPROJECTS_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const createNewProjectReducer = (state, action) => {
  switch (action.type) {
    case "CREATEPROJECT_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CREATEPROJECT_SUCCESS":
      return {
        ...state,
        loading: false,
        projectsDetails: action.payload,
      };
    case "CREATEPROJECT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useGetAllProjects = () => {
  const [state, dispatch] = useReducer(getAllProjectsReducer, initialState);

  useEffect(() => {
    dispatch({ type: "ALLPROJECTS_DATA_LOADING" });
    const getAllProjects = async () => {
      try {
        const projects = await getAll();
        dispatch({ type: "ALLPROJECTS_DATA_SUCCESS", payload: projects.data });
      } catch (error) {
        const payload = error.response ? error.response.data : error;
        dispatch({ type: "ALLPROJECTS_DATA_FAILURE", payload });
      }
    };
    getAllProjects();
  }, []);

  return state;
};

const useCreateNewProject = () => {
  const [newProjectState, dispatch] = useReducer(
    createNewProjectReducer,
    createProjectInitialState
  );

  const createProject = async (newProject) => {
    dispatch({ type: "CREATEPROJECT_LOADING" });
    try {
     const project = await save(newProject);
      dispatch({ type: "CREATEPROJECT_SUCCESS", payload: project.data });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "CREATEPROJECT_FAILURE", payload });
    }
  };
  return [newProjectState, createProject];
};

export {
  useGetAllProjects,
  createNewProjectReducer,
  createProjectInitialState,
  useCreateNewProject
};
