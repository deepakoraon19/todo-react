import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { auth } from "../config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import UserContext from '../Contexts/UserContext';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isUser, setisUser] = useState(true)
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)
    const onSumbit = async (e) => {
        e.preventDefault();
        if (isUser) {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = { uid: userCredential.user.uid, email: email };
                    navigate("/todo")
                    localStorage.setItem("user", JSON.stringify(user))
                    setUser(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
        } else {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = { uid: userCredential.user.uid, email: email };
                    localStorage.setItem("user", JSON.stringify(user))
                    setUser(user);
                    navigate("/todo")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
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