import { FaTimes } from "react-icons/fa"

const Tasks = ({ tasks, handleDelete, toggleReminder }) => {
  return (
    <div>
      {tasks.length > 0
        ? tasks.map((item) => (
            <Task
              key={item.id}
              task={item}
              handleDelete={handleDelete}
              toggleReminder={toggleReminder}
            />
          ))
        : "No tasks"}
    </div>
  )
}

export default Tasks

const Task = ({ task, handleDelete, toggleReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      {task.reminder ? "remind" : ""}
    </div>
  )
}
