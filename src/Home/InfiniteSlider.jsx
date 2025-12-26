import { useEffect, useRef} from "react"
import image from "../assets/main-image-blur.jpg"
export default function InfiniteSlider({title="Slider"}){
    return (
        <div id="slider">
            <h2>{title}</h2>
            <div className="images">
                <Image url={image}/>
                <Image url={image}/>
                <Image url={image}/>
            </div>
        </div>
    )
}

function Image({url}){

    const imgRef = useRef(null)
    
    useEffect(()=>{
        setInterval(()=>{
            const parentPos = imgRef.current.parentElement.getBoundingClientRect()
            const imgPos = imgRef.current.getBoundingClientRect()

            if(imgPos.left+imgRef.current.width <= parentPos.left){
                imgRef.current.style.right = `-${parentPos.width}px`
            }else{
                let currentRight =  Number(imgRef.current.style.right.replace("px",""))
                imgRef.current.style.right = `${currentRight+3}px`
            }
        },30)
    },[])


    return (
        <img ref={imgRef} src={url} alt="" />
    )
}