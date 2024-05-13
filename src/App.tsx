import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Budgeting from "./pages/Budgeting";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import Status from "./pages/Status";
import { NavBar } from "./pages/Navbar";
import { Logout } from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/budgeting" element={<Budgeting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/status" element={<Status />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
