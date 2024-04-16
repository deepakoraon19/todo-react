import React, { useState } from 'react'
import AddDialog from '../Components/AddDialog';
import Box from '@mui/material/Box';
import Tasks from '../Components/Tasks';
function Todo() {
    const [taskList, setTaskList] = useState([])
    const deleteTask = (task) => {
        setTaskList(taskList.filter(p => p.task !== task))
    }
    const updateState = (task) => {
        let updated = taskList.map(p => {
            console.log(task)
            if (p.task === task) {
                p.isComplete = !p.isComplete
                return p
            }
            return p;
        })
        setTaskList(updated)
    }
    return (
        <Box
            height="100vh"
            width="50vw"
            my={4}
            margin="auto"
            padding="50"
            display="flex"
            alignItems="center"
            flexDirection="column"
            bgcolor="white"
        >
            <AddDialog addTask={(list) => setTaskList([...taskList, list])}></AddDialog>
            <br></br>
            <Tasks tasks={taskList} delete={deleteTask} toggleState={updateState}></Tasks>
        </Box>

    )
}

export default Todo