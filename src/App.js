import "./App.css";
import Todo from "./Screens/Todo";
import Home from "./Screens/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import { useState } from "react";
import UserContext from "./Contexts/UserContext";
function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
