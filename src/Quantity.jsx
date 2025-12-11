import { useState} from "react"
export default function Quantity(){
    const [quantity, setQuantity] = useState(0)


    function less(){
        if(quantity>0){
            setQuantity(quantity-1)
        }
    }

    function more(){
        setQuantity(quantity+1)
    }

    
    return (
        <div className="quantity">
            <button onClick={less} className="less">-</button>
            <div className="show-quant">{quantity}</div>
            <button onClick={more} className="more">+</button>
        </div>
    )
}