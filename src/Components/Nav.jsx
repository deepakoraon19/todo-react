import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserContext from '../Contexts/UserContext';
import { auth } from '../config';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import NotificationContext from '../Contexts/NotificationContext';

export default function Nav() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();
    const { setMsg, setshowNotification } = useContext(NotificationContext)
    const handleLogin = () => {
        if (user) {
            signOut(auth).then(() => {
                localStorage.clear()
                setUser(null)
                navigate("/");
                setMsg("Signed out successfully")
            }).catch((error) => {
                setMsg(error.code)
            }).finally(() => {
                setshowNotification(true)
            });;
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ToDo
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>{user ? "LogOut" : "Login"}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
