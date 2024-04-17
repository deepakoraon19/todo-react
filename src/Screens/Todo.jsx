import React, { useEffect, useState } from 'react'
import AddDialog from '../Components/AddDialog';
import Box from '@mui/material/Box';
import Tasks from '../Components/Tasks';
import app from '../config'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";


function Todo() {
    const db = getFirestore(app)
    const toDoCollection = collection(db, 'ToDos')
    const [taskList, setTaskList] = useState([])

    const getTasks = () => {
        getDocs(collection(db, "ToDos")).then(p => {
            let tasks = []
            p.forEach((doc) => {
                let taskObj = doc.data()
                tasks.push({ task: taskObj.task, isComplete: taskObj.isComplete, id: doc.id })
            })
            setTaskList(tasks);
        });
    }

    const addTask = async (task) => {
        try {
            const doc = await addDoc(toDoCollection, task);
            setTaskList([...taskList, { ...task, id: doc.id }]);
        } catch (error) {
            console.log(`Addition failed : ${error}`)
        }
    }

    const deleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, 'ToDos', taskId))
            setTaskList(taskList.filter(p => p.id !== taskId))
        } catch (error) {
            console.log(`Deletion failed : ${error}`)
        }
    }

    const toggleState = async (task) => {
        try {
            await setDoc(doc(db, 'ToDos', task.id), { ...task, isComplete: !task.isComplete }, { merge: true });
            let updated = taskList.map(p => {
                if (p.id === task.id) {
                    p.isComplete = !p.isComplete
                    return p
                }
                return p;
            })
            setTaskList(updated)
        } catch (error) {
            console.log(`Updation failed : ${error}`)
        }

    }

    useEffect(() => {
        getTasks()
    }, [])


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
            <AddDialog addTask={(task) => addTask(task)}></AddDialog>
            <br />
            <Tasks tasks={taskList} delete={deleteTask} toggleState={toggleState}></Tasks>
        </Box>
    )
}

export default Todo