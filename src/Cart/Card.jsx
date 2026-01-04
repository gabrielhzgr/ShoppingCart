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

    let myTotal = item.price*item.quantity
    myTotal = myTotal.toFixed(2)
    let myPriceEach = item.price.toFixed(2)



    return (
        (<article className="item" aria-label={item.title}>
            <div className="description">
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
                                setDeleting(true)
                            }}>  
                                delete   
                        </span>  
                    </div>
                </div>
                <div>
                        <h2 >Selected: <span>{`${item.quantity}`}</span></h2>
                        <h2>Price each: <span>{`$${myPriceEach}`}</span></h2>
                        <h2>Total: {`$${myTotal}`}</h2>
                    </div> 
                    {deleting ? <div className={`confirmation-removal`}>
                        <h2 className="info">Proceed to remove?</h2>
                        <button className="yes-delete" onClick={()=>{
                            let cartCopy = {...cartItems}
                            delete cartCopy[item.id]
                            setCartItems(cartCopy)
                            
                        }}>Yes</button>
                        <button className="no-delete" onClick={()=>{
                            setDeleting(false)
                            }}>No</button>
            
                    </div> : null} 
            </div>   
        </article>)
    )
}