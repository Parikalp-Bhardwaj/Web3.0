import React from 'react'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Navbar from "./Navbar"
import Contact from "./Contact"
import About from "./About"
import Next from "./Next"
import Connect from "./Connect"
import PageNotFound from "./PageNotFound"


const Index = () => {
    
    return (
        <>
            <Router>
                <Navbar />

                <Routes>
                    <Route exact path="/" element={<Connect/>} />
                        
                    <Route exact path="/about" element={<About />} />
                        
                    <Route exact path="/contact" element={<Contact />} />

                    <Route exact path="/next/:email" element={<Next  />} />

                    <Route path="*" element={<PageNotFound/>} />
                    
                </Routes>
            </Router>
        </>
    )
}

export default Index
