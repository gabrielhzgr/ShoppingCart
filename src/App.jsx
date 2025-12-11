import {useParams, Outlet } from "react-router"
import Navbar from "./Navbar/Navbar.jsx"
import { useState } from "react"
export default function App(){
    const [items, setItems] = useState([])

    return (
        <>
            <Navbar itemsSize={items.length}></Navbar>
            <Outlet context={{items, setItems}}/>
        </>
    )
}