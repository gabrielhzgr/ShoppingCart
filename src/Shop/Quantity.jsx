import { useState} from "react"
export default function Quantity(){
    const [quantity, setQuantity] = useState('0')


    function less(){
        if(quantity>0){
            setQuantity((Number(quantity)-1).toString())
        }
    }

    function more(){
        setQuantity((Number(quantity)+1).toString())
    }

    function change(event){
        let text = event.target.value
        text = text.replace(/^0|[^0-9]/g,'')
        if(text==''){
           setQuantity('0')  
        }else{
             setQuantity(text)
        }
    }

    
    return (
        <div className="quantity">
            <button onClick={less} className="less">-</button>
            <input name="show-quant" type="text" className="show-quant" value={quantity} onChange={change}/>
            <button onClick={more} className="more">+</button>
        </div>
    )
}