import {useParams, Outlet } from "react-router"
import Navbar from "./Navbar/Navbar.jsx"
import { useState } from "react"
export default function App(){
    const [cartItems, setCartItems] = useState({})

    return (
        <>
            <Navbar itemsSize={Object.keys(cartItems).length}></Navbar>
            <Outlet context={[cartItems, setCartItems]}/>
        </>
    )
}