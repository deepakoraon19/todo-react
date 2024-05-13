import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import UserContext from '../Contexts/UserContext';

function AddDialog({addTask}) {
    const [task, setTask] = useState('')
    const {user} = useContext(UserContext)
    const add = () => {
        addTask({ value: task, isComplete: false, user : user.uid })
        setTask('')
    }
    
    return (
        <Box justifyContent="center" alignItems="center" paddingTop="1rem">
            <TextField value={task} id="outlined-basic" label="Task" variant="standard" onChange={(p) => setTask(p.target.value)} />
            <Button variant="text" onClick={p => add()}>Add</Button>
        </Box>
    )
}

export default AddDialog