import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#FFFCFB" }}
    >
      <div className="container-fluid">
        <NavLink
          className="navbar-brand fw-bold"
          to="/app"
          style={{ color: "#212121" }}
        >
          WindTalk
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="navbar-nav gap-2">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `nav-link rounded-pill px-3 py-1 ${
                  isActive ? "fw-bold" : "fw-medium"
                } text-dark`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#E3DE61" : "",
              })}
            >
              Conversations
            </NavLink>
            <NavLink
              to="/app/search_people"
              className={({ isActive }) =>
                `nav-link rounded-pill px-3 py-1 ${
                  isActive ? "fw-bold" : "fw-medium"
                } text-dark`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#E3DE61" : "",
              })}
            >
              Search People
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
