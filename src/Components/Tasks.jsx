import React from 'react'
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

function Tasks(task) {
    return (
        <div>
            {task.tasks.map((taskItr, i) =>
                <Box key={i} display="flex" flexDirection="row">
                    <Checkbox value={taskItr.isComplete} onChange={s => task.toggleState(taskItr.task)} />
                    <h3 >{taskItr.task}</h3>
                    <IconButton aria-label="delete" size="small" onClick={s => task.delete(taskItr.task)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            )}
        </div>
    )
}

export default Tasks