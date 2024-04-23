import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';


function AddDialog({addTask}) {
    const [task, setTask] = useState('')
    const add = () => {
        addTask({ value: task, isComplete: false })
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