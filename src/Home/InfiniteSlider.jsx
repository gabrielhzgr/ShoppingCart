import { useEffect, useRef, useState} from "react"
import { useQuery } from "@tanstack/react-query"
export default function InfiniteSlider({title="Slider"}){
    const imagesRef = useRef(null)
    let noOfOffers = 4
    const {data, error, isPending:loading} = useQuery({
            queryKey: ['items'],
            queryFn: async () => {
                const response = await fetch('https://fakestoreapi.com/products',{mode:'cors'})

                if(!response.ok){
                    throw new Error('HTTP error: Status ${response.status}')
                }

                return response.json()  
            }
        }
    )

    let filteredData = null
    if(data){
        filteredData = data.toSorted((item1,item2)=>item1.price-item2.price)
        filteredData = filteredData.slice(0,noOfOffers)
    
    }

    useEffect(()=>{
        let interval = null
        let resized = false
        let posOfLast = noOfOffers-1
        function onResize(){
            resized = true 
        }
        if(data){
            window.addEventListener('resize',onResize)
            setInterval(()=>{
                if(resized){
                    resized = false
                    let images = imagesRef.current.querySelectorAll('.item')
                    images.forEach(image=>{
                        image.style.right = '0px'
                    })
                }else{
                    let images = imagesRef.current.querySelectorAll('.item')
                    //20px is margin right of items
                    if((images[0].getBoundingClientRect().width + 20)*images.length > 
                    imagesRef.current.getBoundingClientRect().width){
                        images.forEach(image=>{
                            const parentPos = imagesRef.current.getBoundingClientRect()
                            const imagePos = image.getBoundingClientRect()
                            const posno = Number(image.dataset.posno)
            
                            if(imagePos.left+imagePos.width <= parentPos.left){
                                let lastImage = imagesRef.current.querySelector(`.item[data-posno="${posOfLast}"]`)
                                let lastImagePos = lastImage.getBoundingClientRect().right+20
                                image.style.right = `${-lastImagePos}px`
                            }else{
                                let currentRight =  Number(image.style.right.replace("px",""))
                                image.style.right = `${currentRight+1}px`
                            }
                            
                        })

                    }else{
                        images.forEach(image=>{
                            const parentPos = imagesRef.current.getBoundingClientRect()
                            const imagePos = image.getBoundingClientRect()
                            const posno = Number(image.dataset.posno)
            
                            if(imagePos.left+imagePos.width <= parentPos.left){
                                let offset = (imagePos.width + 20) * posno
                                image.style.right = `${-parentPos.width+offset}px`
                            }else{
                                let currentRight =  Number(image.style.right.replace("px",""))
                                image.style.right = `${currentRight+1}px`
                            }

                        })
                    }
                }
            },10)
            
        }

        return ()=>{
            if(interval){
                clearInterval(interval)
            }
            window.removeEventListener('resize',onResize)
        }
    },[data])

    
    
    return (
        <section className="slider">
            <h2>{title}</h2>
            {loading && 
                <section className="skeleton">
                </section>}
            {error && 'error'}
            {filteredData &&
                <section ref={imagesRef} className="images">
                    
                    {filteredData.map((item,index)=>{
                        return <Item key={item.id} item={item} posno={index}/>
                    })}
                        
                </section>
            }
        </section>
    )
}

function Item({item, posno}){

    return (
        <div className="item" data-posno={posno}>
            
            <img src={item.image}  alt={item.title} />
            <p>${item.price}</p>
        </div>
    )
}



