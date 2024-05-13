import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { auth } from "../config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isUser, setisUser] = useState(true)

    const onSumbit = async (e) => {
        e.preventDefault();
        if (isUser) {
            await signInWithEmailAndPassword(auth, userName, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // navigate("/home")
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
        } else {
            await createUserWithEmailAndPassword(auth, userName, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("Signup",user);
                    // navigate("/login")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
                });
        }
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
            <TextField label="User Name" variant="standard" onChange={(p) => setUserName(p.target.value)}></TextField>
            <TextField sx={{ my: 2 }} label="Password" variant="standard" onChange={(p) => setPassword(p.target.value)}></TextField>
            <Button sx={{ my: 1 }} color="secondary" variant="contained" onClick={(p) => { onSumbit(p) }}>
                {isUser ? "LOGIN" : "SIGN UP"}
            </Button>
            <Box sx={{ pt: 1 }} display="flex" alignItems="center">
                <Typography>{isUser ? "Not an existing user?" : "Already a user?"} </Typography>
                <Button onClick={() => { setisUser(!isUser) }}>{isUser ? "SIGN UP" : "LOGIN"}</Button>
            </Box>
        </Box>
    )
}

export default Login