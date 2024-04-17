import React from 'react'
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

function Tasks(task) {
    return (
        <>
            {task.tasks.map((taskItr) =>
                <Box key={taskItr.id} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width={"80%"} >
                    <Checkbox color="success" size="small" checked={taskItr.isComplete} onChange={s => task.toggleState(taskItr)} />
                    {taskItr.isComplete !== true
                        ? <Typography variant="h6">{taskItr.task}</Typography>
                        : <Typography variant="h6" style={{color: 'green'}}>{taskItr.task}</Typography>}
                    <IconButton aria-label="delete" size="small" onClick={s => task.delete(taskItr.id)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            )}
        </>
    )
}

export default Tasks