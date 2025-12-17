import { Link } from "react-router"
import './Navbar.css'
export default function Navbar({itemsSize}){
    return (
        <nav>
            <h1 className="shop-title">MYSHOP</h1>
            <ul className="links">
                <Link to='/home' viewTransition>🏠Home</Link>
                <Link to='/shop' viewTransition>🛍️Shop</Link>
                <Link to='/cart' viewTransition className="cart-link">
                🛒Cart
                    <i>({itemsSize})</i>
                </Link>
            </ul>
        </nav>
    )
}