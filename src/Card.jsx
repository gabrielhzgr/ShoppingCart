import Quantity from "./Quantity.jsx"
export default function Card({item}){
    return (
        <article>
            <img src={item.image} alt={item.title} />
            <section className="info">
                <h2 className="title">{item.title}</h2>
                <h2 className="price">$ {item.price}</h2>
                <h2 className="category">{item.category}</h2>
            </section>
             <section className="actions">
                    <Quantity></Quantity>
                    <button className="add-cart">
                        🛒 Add to cart
                    </button> 
                </section>
        </article>
    )
}