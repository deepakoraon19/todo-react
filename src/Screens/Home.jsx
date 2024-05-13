import { useContext, useEffect, useState } from "react";
import Login from "../Components/Login";
import Todo from "./Todo";
import UserContext from "../Contexts/UserContext";


function Home() {
    const { setUser } = useContext(UserContext)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    
    const getUser = () => {
        let localUser = localStorage.getItem("user")
        if (localUser === null) {
            setisLoggedIn(false);
        } else {
            setisLoggedIn(true);
            setUser("user", localUser)
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    return (<>
        {
            isLoggedIn ? <Todo></Todo> : <Login></Login>
        }
    </>)
}

export default Home;