// TaskList.js
import Task from "./Task"

const TaskList = ({ tasks, completeTask, deleteTask }) => {
  return (
    <div>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  )
}

export default TaskList
