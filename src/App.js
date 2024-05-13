import "./App.css";
import Todo from "./Screens/Todo";
import Home from "./Screens/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import React, { useState } from "react";
import UserContext from "./Contexts/UserContext";
import Snackbar from "@mui/material/Snackbar";
import NotificationContext from "./Contexts/NotificationContext";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [user, setUser] = useState(null);
  const [showNotification, setshowNotification] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () =>{
    setMsg("")
    setshowNotification(false)
  }
  const action = (
    <React.Fragment>
            <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <NotificationContext.Provider value={{ showNotification, setshowNotification, msg, setMsg }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Router>
            <Nav></Nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<Todo />} />
            </Routes>
            <Snackbar
            anchorOrigin={{  vertical: 'top', horizontal: 'right' }}
              open={showNotification}
              autoHideDuration={5000}
              onClose={handleClose}
              message={msg}
              action={action}
            />
          </Router>
        </div>
      </UserContext.Provider>
    </NotificationContext.Provider>
  );
}

export default App;
