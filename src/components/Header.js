import PropTypes from "prop-types"
import { MdExpandLess } from "react-icons/md"
import { MdExpandMore } from "react-icons/md"
import { useLocation } from "react-router-dom"

const Header = ({ title, addFormVis, setAddFormVis }) => {
  const location = useLocation()
  console.log("----------location--------------", location)
  return (
    <div>
      <header className="header">
        <h1>{title}</h1>
        {location.pathname === "/" && (
          <Button
            text="Add"
            color="green"
            addFormVis={addFormVis}
            setAddFormVis={setAddFormVis}
          />
        )}
      </header>
    </div>
  )
}

const Button = ({ text, color, addFormVis, setAddFormVis }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className="btn"
      onClick={() => setAddFormVis((prev) => !prev)}
    >
      <span style={{ paddingRight: "10px" }}>{text}</span>
      {addFormVis ? <MdExpandLess /> : <MdExpandMore />}
    </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
}
export default Header
