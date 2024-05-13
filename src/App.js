import "./App.css";
import Todo from "./Screens/Todo";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <Todo></Todo> */}
      <Home></Home>
    </div>
  );
}

export default App;
