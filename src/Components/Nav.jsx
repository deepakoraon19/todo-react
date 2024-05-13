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

export default function Nav() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogin = () => {
        if (user) {
            signOut(auth).then(() => {
                localStorage.clear()
                setUser(null)
                navigate("/");
                console.log("Signed out successfully")
            }).catch((error) => {
                // An error happened.
            });
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
