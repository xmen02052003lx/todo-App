// TodoApp.js
import { useState, useEffect } from "react"
import TaskList from "./components/TaskList"
import { RiDeleteBin7Line } from "react-icons/ri"

const App = () => {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState("")
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    setTasks(storedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (taskText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      }
      setTasks([...tasks, newTask])
      setTaskText("")
    }
  }

  const completeTask = taskId => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const clearAllTasks = () => {
    const shouldClearAll = window.confirm(
      "Are you sure you want to clear all tasks?"
    )
    if (shouldClearAll) {
      setTasks([])
    }
  }

  const filteredTasks = () => {
    switch (filter) {
      case "Active":
        return tasks.filter(task => !task.completed)
      case "Complete":
        return tasks.filter(task => task.completed)
      default:
        return tasks
    }
  }

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <div className="filterBtn">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Complete")}>Complete</button>
      </div>
      <TaskList
        tasks={filteredTasks()}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />

      <div className="deleteAllBtn">
        <button className="delete-btn" onClick={clearAllTasks}>
          <RiDeleteBin7Line />
          Delete All
        </button>
      </div>
    </div>
  )
}

export default App
