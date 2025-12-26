import { useOutletContext } from "react-router"
import './Cart.css'
import Card from "./Card.jsx"
import { useState, useEffect, use} from "react"

export default function Cart(){
    const [cartItems, setCartItems] = useOutletContext()
    const [deleteId, setDeleteId] = useState(null)

    return (
        <main>

            <section className="cart">
                {Object.keys(cartItems).length==0 ? <p>No items added yet</p> : 
                Object.keys(cartItems).map(id=>{
                    return (
                    <Card 
                        key={id}
                        item={cartItems[id]} 
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                    />)
                })
                } 
                
                
                
            </section>
            
            
        </main>
    )
}
