import { useState } from "react";
import { useTasksContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

const FormCreateTask = ({ onCloseForm }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const tasks = { title, date };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDate("");
      setError(null);
      setEmptyFields([]);

      onCloseForm();
      dispatch({ type: "CREATE_TASK", payload: data });
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2>Add a new task</h2>
      <input
        type="text"
        placeholder="Task Title"
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <input
        type="text"
        placeholder="Add Date"
        onChange={(e) => setDate(e.target.value)}
        className={emptyFields.includes("date") ? "error" : ""}
      />
      <button className="btn-add">Add Task</button>
      <p className="error-msg">{error}</p>
      <p onClick={onCloseForm} className="btn-close-form">
        ✖
      </p>
    </form>
  );
};

export default FormCreateTask;
