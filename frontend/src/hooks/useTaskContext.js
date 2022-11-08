import { useContext } from "react";
import { TasksContext } from "../context/TaskContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    Error("useTasksContext must be used inside a TasksContextProvider");
  }

  return context;
};
