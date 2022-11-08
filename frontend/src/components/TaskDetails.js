import { useTasksContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: data });
    }
  };

  return (
    <div className="task-details">
      <h3>{task.title}</h3>
      <p className="date">{task.date}</p>
      <span className="createdAt">
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </span>
      <span onClick={handleClick} className="delete-task">
        ✖
      </span>
    </div>
  );
};

export default TaskDetails;
