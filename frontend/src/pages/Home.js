import { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

import TaskDetails from "../components/TaskDetails";
import FormCreateTask from "../components/FormCreateTask";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  // FORM pop-up
  const [isFormOpen, setIsFormOpen] = useState(false);

  // CREATE data
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch("api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_TASKS", payload: data });
      }
    };
    if (user) {
      fetchTask();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <button onClick={() => setIsFormOpen(true)} className="btn-add-task">
        Add Task
      </button>

      {tasks && tasks.length > 0 ? (
        <div className="tasks">
          {tasks.map((task) => (
            <TaskDetails key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <h1 className="no-task_msg">No task to show</h1>
      )}

      {isFormOpen ? (
        <FormCreateTask
          isFormOpen={isFormOpen}
          onCloseForm={() => setIsFormOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default Home;
