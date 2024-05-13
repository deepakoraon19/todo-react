import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { auth } from "../config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import UserContext from '../Contexts/UserContext';
import NotificationContext from '../Contexts/NotificationContext';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isUser, setisUser] = useState(true)
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)
    const { setshowNotification, setMsg } = useContext(NotificationContext)

    const parseError = (error) => {
        let msg = ""
        switch (error) {
            case "email":
                msg = "Invalid Email"
                break;
            case "credential":
                msg = "Invalid Password"
                break;
            default:
                msg = "Something went wrong"
        }
        return msg
    }

    const onSumbit = async (e) => {
        e.preventDefault();
        if (isUser) {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = { uid: userCredential.user.uid, email: email };
                    localStorage.setItem("user", JSON.stringify(user))
                    setUser(user);
                    setMsg(`Logged in as ${email}`)
                    navigate("/todo")
                })
                .catch((error) => {
                    setMsg(parseError(error.code));
                }).finally(() => {
                    setshowNotification(true)
                });
        } else {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = { uid: userCredential.user.uid, email: email };
                    localStorage.setItem("user", JSON.stringify(user))
                    setUser(user);
                    setMsg(`Logged in as ${email}`)
                    navigate("/todo")
                })
                .catch((error) => {
                    setMsg(parseError(error.code));
                }).finally(() => {
                    setshowNotification(true)
                });
        }
    }

    const resetFields = () => {
        setEmail('')
        setPassword('')
    }

    return (
        <Box height="100vh"
            width="50vw"
            margin="auto"
            display="flex"
            alignItems="center"
            flexDirection="column"
            bgcolor="white"
            sx={{ pt: 7 }}>
            <Typography variant="h3" gutterBottom>{isUser ? "LOGIN" : "SIGN UP"}</Typography>
            <TextField label="User Name" variant="standard" onChange={(p) => setEmail(p.target.value)}></TextField>
            <TextField sx={{ my: 2 }} label="Password" variant="standard" onChange={(p) => setPassword(p.target.value)}></TextField>
            <Button sx={{ my: 1 }} color="secondary" variant="contained" onClick={(p) => { onSumbit(p) }}>
                {isUser ? "LOGIN" : "SIGN UP"}
            </Button>
            <Box sx={{ pt: 1 }} display="flex" alignItems="center">
                <Typography>{isUser ? "Not an existing user?" : "Already a user?"} </Typography>
                <Button onClick={() => { setisUser(!isUser); resetFields(); }}>{isUser ? "SIGN UP" : "LOGIN"}</Button>
            </Box>
        </Box>
    )
}

export default Login