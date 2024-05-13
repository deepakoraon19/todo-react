import React, { useContext, useEffect, useState } from 'react'
import AddDialog from '../Components/AddDialog';
import Box from '@mui/material/Box';
import Tasks from '../Components/Tasks';
import app from '../config'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc, query, where } from "firebase/firestore";
import UserContext from '../Contexts/UserContext';


function Todo() {
    const db = getFirestore(app)
    const toDoCollection = collection(db, 'ToDos')
    const [taskList, setTaskList] = useState([])
    const { user } = useContext(UserContext)
    /**
     * The function `getTasks` retrieves tasks from a Firestore collection and updates the task list
     * state in a React component.
     */
    const getTasks = () => {
        getDocs(query(collection(db, "ToDos"), where("user", "==", user.uid))).then(p => {
            let tasks = []
            p.forEach((doc) => {
                let taskObj = doc.data()
                tasks.push({ value: taskObj.value, isComplete: taskObj.isComplete, id: doc.id, user: taskObj.user })
            })
            setTaskList(tasks);
        });
    }

    /**
     * The `addTask` function asynchronously adds a task to a Firestore collection and updates the task list with the
     * new task.
     */
    const addTask = async (task) => {
        try {
            const doc = await addDoc(toDoCollection, task);
            setTaskList([...taskList, { ...task, id: doc.id }]);
        } catch (error) {
            console.log(`Addition failed : ${error}`)
        }
    }

    /**
     * The `deleteTask` function deletes a task from a Firestore collection and updates the state accordingly.
     */
    const deleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, 'ToDos', taskId))
            setTaskList(taskList.filter(p => p.id !== taskId))
        } catch (error) {
            console.log(`Deletion failed : ${error}`)
        }
    }

    /**
     * The `updateTask` function updates a task in a Firestore collection by replacing the existing task with a new one
     * based on the task ID.
     */
    const updateTask = async (task) => {
        try {
            await setDoc(doc(db, 'ToDos', task.id), { ...task }, { merge: true });
            let updated = taskList.map(p => {
                if (p.id === task.id) {
                    p = task
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
        if (taskList.length === 0) {
            console.log("Fetching")
            getTasks()
        }
    })

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
            <Tasks tasks={taskList} deleteTask={deleteTask} updateTask={updateTask}></Tasks>
        </Box>
    )
}

export default Todo