import { useEffect, useState } from "react";
import Login from "../Components/Login";
import Todo from "./Todo";


function Home() {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        let localUser = localStorage.getItem("user")
        if (localUser === null) {
            setisLoggedIn(false);
        } else {
            setisLoggedIn(true);
        }
    }

    return (<>
        {
            isLoggedIn ? <Todo></Todo> : <Login></Login>
        }
    </>)
}

export default Home;