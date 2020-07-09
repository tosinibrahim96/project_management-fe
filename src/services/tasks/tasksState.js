import { useReducer } from "react";
import { save } from "./taskRequests";

const createTaskInitialState = {
  loading: false,
  error: "",
  taskDetails: {},
};

const createNewTaskReducer = (state, action) => {
  switch (action.type) {
    case "CREARETASK_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CREARETASK_SUCCESS":
      return {
        ...state,
        loading: false,
        taskDetails: action.payload,
      };
    case "CREARETASK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useCreateNewTask = () => {
  const [newTaskState, dispatch] = useReducer(
    createNewTaskReducer,
    createTaskInitialState
  );

  const createTask = async (newTask) => {
    dispatch({ type: "CREARETASK_LOADING" });
    try {
      const task = await save(newTask);
      dispatch({ type: "CREARETASK_SUCCESS", payload: task.data });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "CREARETASK_FAILURE", payload });
    }
  };
  return [newTaskState, createTask];
};

export { useCreateNewTask };
