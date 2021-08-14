import { useState, useEffect } from "react"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Tasks from "./components/Tasks.js"
import AddTask from "./components/AddTask.js"

function App() {
  // fetch tasks from server
  const [addFormVis, setAddFormVis] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    syncTasks()
  }, [])

  // sync the tasks with server
  const syncTasks = async () => {
    const data = await fetchTasks()
    setTasks(data)
  }

  const fetchTasks = async () => {
    const resp = await fetch("http://localhost:5000/tasks")
    const data = await resp.json()
    console.log("-------fetched-data-------", data)
    return data
  }
  const fetchTaskWithId = async (id) => {
    const resp = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await resp.json()
    console.log("---------taks-with-id--------", data)
    return data
  }
  // delete task from server
  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
    const data = await resp.json()
    console.log("----------deleted---------", data)
    // await syncTasks()
    setTasks((prev) => prev.filter((item) => item.id !== id))
  }

  // toggle reminder
  const toggleReminder = async (id) => {
    const prevData = await fetchTaskWithId(id)
    const updatedData = { ...prevData, reminder: !prevData.reminder }
    const resp = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
    const data = await resp.json()
    console.log("----------data-fetched-after-update-----------", data)
    // syncTasks()
    setTasks((prev) => prev.map((item) => (item.id === id ? data : item)))
  }

  // save the task to server
  const saveTask = async (task) => {
    const resp = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
    const data = await resp.json()
    // await syncTasks()
    setTasks((prev) => [...prev, data])
  }

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        addFormVis={addFormVis}
        setAddFormVis={setAddFormVis}
      />
      {addFormVis && <AddTask saveTask={saveTask} />}
      <Tasks
        tasks={tasks}
        handleDelete={handleDelete}
        toggleReminder={toggleReminder}
      />
      <Footer />
    </div>
  )
}

export default App
