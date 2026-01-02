
import { useState } from "react"
import { useOutletContext } from "react-router"

export default function Card({item}){
    const [quantity, setQuantity] = useState(0)
    const [cartItems, setCartItems] = useOutletContext()

    function less(){
        if(quantity>0){
            setQuantity(quantity-1)
        }
    }

    function more(){
        setQuantity(quantity+1)
    }

    function changeQuant(event){
        let text = event.target.value
        text = text.replace(/^0|[^0-9]/g,'')
        if(text==''){
           setQuantity('0')  
        }else{
             setQuantity(text)
        }
    }

    function addToCart(){
        if(quantity!==0){
            if(item.id in cartItems){
                setCartItems({...cartItems,[item.id]:{...item,'quantity':cartItems[item.id].quantity+quantity}})
            }else{
                setCartItems({...cartItems,[item.id]:{...item,'quantity':quantity}})
            }
        }
       
    }

    return (
        <article key={item.id} aria-label={item.title}>
            <img src={item.image} alt={item.title} />
            <section className="info">
                <h2 className="price">$ {item.price}</h2>
                <h2 className="title">{item.title}</h2>
                <h2 className="category">{'*'+item.category+'*'}</h2>
            </section>
             <section className="actions">
                    <div className="quantity">
                        <button onClick={less} className="less">-</button>
                        <input name="show-quant" type="text" className="show-quant" value={quantity} onChange={changeQuant}/>
                        <button onClick={more} className="more">+</button>
                     </div>
                    <button className="add-cart" onClick={addToCart}>
                        🛒 Add to cart
                    </button> 
                </section>
        </article>
    )
}