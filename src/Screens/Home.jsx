import { useContext, useEffect, useState } from "react";
import Login from "../Components/Login";
import Todo from "./Todo";
import UserContext from "../Contexts/UserContext";


function Home() {
    const { user, setUser } = useContext(UserContext)

    const getUser = () => {
        let localUser = localStorage.getItem("user")
        if (localUser === null) {
        } else {
            setUser(JSON.parse(localUser))
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    return (<>
        {
            user ? <Todo></Todo> : <Login></Login>
        }
    </>)
}

export default Home;