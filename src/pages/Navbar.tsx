import { NavLink } from "react-router-dom";
export function NavBar() {
  return (
    <nav className="navbar-container">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/Budgeting">Budgeting</NavLink>
      <NavLink to="/Expenses">Expenses</NavLink>
      <NavLink to="/Status">Status</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </nav>
  );
}
