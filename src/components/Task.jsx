import { RiDeleteBin7Line } from "react-icons/ri"

const Task = ({ task, completeTask, deleteTask }) => {
  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    )
    if (shouldDelete) {
      deleteTask(task.id)
    }
  }
  return (
    <div className="container">
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <button onClick={() => completeTask(task.id)}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button className="delete-one-btn" onClick={handleDelete}>
        <RiDeleteBin7Line />
      </button>
    </div>
  )
}

export default Task
