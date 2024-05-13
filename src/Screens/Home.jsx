import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc, where } from "firebase/firestore";
import app from "../config"
import { useEffect, useState } from "react";
import Login from "../Components/Login";


function Home() {
    const db = getFirestore(app)
    const [user, setUser] = useState({})
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        // localStorage.setItem("user", {})
        getUser()
    }, [])

    const getUser = () => {
        let localUser = localStorage.getItem("user")
        if (localUser === null) {
            // getDocs(query(collection(db, "Users"), where("userName", "==", "localUser"))).then(p => {
            //     let tasks = []
            //     p.forEach((doc) => {
            //         let user = doc.data()
            //         tasks.push({ password: user.password, userName: user.userName, id: doc.id })
            //     })
            //     setUser(tasks);
            // });
            setisLoggedIn(false);
        } else {
            setisLoggedIn(true);
        }
    }

    return (<>
        {
            isLoggedIn
                ? <></>
                : <Login></Login>
        }
    </>)
}

export default Home;