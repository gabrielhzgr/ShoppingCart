import { useState, useEffect } from "react"

export default function Card({item, cartItems, setCartItems}){

    const [deleting, setDeleting] = useState(false)

    useEffect(()=>{
        if(deleting){
            setTimeout(()=>{
                setDeleting(false)
            },3000)
        }
    },[deleting])


    return (
        (<div className="item">
            <div className="info">
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>  
            </div>
            <div className="price-info">
                <div className="options">
                    <div className="wrap-icon">
                        <span className={deleting ? 
                            "material-symbols-outlined more disabled" : "material-symbols-outlined more"} 
                            onClick={()=>{
                                setCartItems({...cartItems, [item.id]:{...cartItems[item.id],
                                    'quantity':cartItems[item.id].quantity+1}
                                })
                            }}>
                            add
                        </span>
                    </div>
                    <div className="wrap-icon">
                        <span className={deleting ? 
                            "material-symbols-outlined less disabled" : "material-symbols-outlined less"} 
                            onClick={()=>{
                                if(item.quantity==1){
                                    setDeleting(true)
                                }else{
                                    setCartItems({...cartItems,[item.id]:{
                                        ...cartItems[item.id],'quantity':cartItems[item.id].quantity-1
                                        }
                                    })
                                } 
                            }}>
                            remove
                        </span>
                    </div>
                    <div className="wrap-icon">
                        <span className={deleting ? 
                            "material-symbols-outlined trash disabled" :"material-symbols-outlined trash" } 
                            onClick={()=>{
                                let cartCopy = cartItems
                                delete cartCopy[item.id]
                                setCartItems(cartCopy)
                            }}>  
                                delete   
                        </span>  
                    </div>
                </div>
                <div>
                        <h2 >Selected: <span>{`${item.quantity}`}</span></h2>
                        <h2>Price each: <span>{`$${item.price}`}</span></h2>
                        <h2>Total: {`$${item.price*item.quantity.toFixed(2)}`}</h2>
                    </div> 
                    {deleting ? <div className={`confirmation-removal`}>
                        <h2 className="info">Confirm removal?</h2>
                        <button onClick={()=>{
                            let cartCopy = {...cartItems}
                            delete cartCopy[item.id]
                            setCartItems(cartCopy)
                            
                        }}>Yes</button>
                        <button onClick={()=>{
                            setDeleting(false)
                            }}>No</button>
            
                    </div> : null} 
            </div>   
        </div>)
    )
}