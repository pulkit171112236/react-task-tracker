import { useState } from "react"
const AddTask = ({ saveTask }) => {
  const [state, setState] = useState({
    text: "",
    day: "",
    reminder: false,
  })
  const handleChange = (event) => {
    const { type, name, value, checked } = event.target
    setState((prev) => {
      return type === "checkbox"
        ? { ...prev, [name]: checked }
        : { ...prev, [name]: value }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.text) {
      console.log(state)
      saveTask({ ...state })
      setState({ text: "", day: "", reminder: false })
    } else console.log("empty taskname")
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Add Task</label>
        <input
          type="text"
          placeholder="Add Task"
          name="text"
          value={state.text}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label>Add Day & time</label>
        <input
          type="text"
          placeholder="Add day and time"
          name="day"
          value={state.day}
          onChange={handleChange}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Reminder</label>
        <input
          type="checkbox"
          name="reminder"
          checked={state.reminder}
          onChange={handleChange}
        />
      </div>
      {/* <button className="btn btn-block" type="submit" >
        Save Task
      </button> */}
      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  )
}

export default AddTask
