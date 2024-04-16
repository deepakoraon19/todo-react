import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';


function AddDialog(props) {
    const [task, setTask] = useState('')
    const addTask = (p) => {
        p.target.value = ""
        props.addTask({ task: task, isComplete: false })
    }
    return (
            <Box justifyContent="center" alignItems="center">
                <TextField id="outlined-basic" label="Task" variant="standard" onChange={(p) => { setTask(p.target.value) }} />
                <Button variant="text" onClick={p => addTask(p)}>Add</Button>
            </Box>
    )
}

export default AddDialog