import React, { useState } from 'react'
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
function Tasks({ tasks, deleteTask, updateTask }) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [editID, setEditID] = useState('')
    const [taskField, setTaskField] = useState('')

    const editMode = (t) => {
        setIsEditMode(true)
        setEditID(t.id)
        setTaskField(t.value)
    }
    const _updateTask = (t) => {
        updateTask({ ...t, value: taskField })
        resetEditMode()
    }
    const toggleState = (task) => {
        updateTask({ ...task, isComplete: !task.isComplete })
        resetEditMode()
    }
    const resetEditMode = () => {
        setIsEditMode(false)
        setEditID('')
    }
    
    return (
        <>
            {tasks.map((task) =>
                <Box key={task.id} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width={"80%"} >
                    <Checkbox color="success" size="small" checked={task.isComplete} onChange={s => toggleState(task)} disabled={isEditMode} />
                    {
                        isEditMode === true && editID === task.id
                            ? <TextField id="standard-basic" label="Standard" onChange={(p) => setTaskField(p.target.value)} variant="standard" value={taskField} />
                            : task.isComplete !== true
                                ? <Typography variant="h6">{task.value}</Typography>
                                : <Typography variant="h6" style={{ color: 'green' }}>{task.value}</Typography>
                    }
                    <Box>
                        {
                            isEditMode === true && editID === task.id ?
                                <Box>
                                    <IconButton aria-label="save" size="small" onClick={s => _updateTask(task)}>
                                        <SaveIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton aria-label="clear" size="small" onClick={s => resetEditMode()} >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                </Box>
                                :
                                <Box>
                                    <IconButton aria-label="update" size="small" onClick={s => editMode(task)} disabled={isEditMode}>
                                        <ModeEditIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" onClick={s => deleteTask(task.id)} disabled={isEditMode}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Box>
                        }
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Tasks