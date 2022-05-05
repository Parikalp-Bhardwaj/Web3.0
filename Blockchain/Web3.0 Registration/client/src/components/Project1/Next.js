import React from 'react'
// import Navbar from "./Navbar"
import {useLocation} from "react-router-dom"
import PageNotFound from "./PageNotFound"
const Next = () => {
    const location = useLocation()
    return (
        <div>
            {location.state.register?(<PageNotFound />)
            :
            (
            <div>
            <h1>Hey {location.state.name} you are being joined</h1>
            <h1>{location.state.name}</h1>
            <h1>{location.state.lname}</h1>
            {console.log("register",location.state.register)}
            </div>
            )}
            
        </div>
    )
}

export default Next
