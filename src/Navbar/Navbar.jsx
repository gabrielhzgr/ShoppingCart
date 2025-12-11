import { Link } from "react-router"
import './Navbar.css'
export default function Navbar({itemsSize}){
    return (
        <nav>
            <h1 className="shop-title">MYSHOP</h1>
            <ul className="links">
                <Link to='/home'>🏠Home</Link>
                <Link to='/shop'>🛍️Shop</Link>
                <Link to='/cart' className="cart-link">
                🛒Cart
                    <i>({itemsSize})</i>
                </Link>
            </ul>
        </nav>
    )
}