import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TodoContext } from "../../contexts/TodoContext";

const Navbar: React.FC<{}> = () => {
  const { user, logout } = useContext(AuthContext);
  const {setTodos} = useContext(TodoContext)

  const handleLogout = () => {
    setTodos([])
    logout()
  };
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <h3>Todo App</h3>
        </span>
        <div className="d-flex align-items-center">
          <h5 className="me-5">Hello {user?.name}</h5>
          <button
            className="btn btn-outline-danger"
            type="submit"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
