import { useEffect, useRef} from "react"
import image from "../assets/main-image-blur.jpg"
export default function InfiniteSlider({title="Slider"}){
    return (
        <div id="slider">
            <h2>{title}</h2>
            <div className="images">
                <Image url={image} posNo={0}/>
                <Image url={image} posNo={1}/>
                <Image url={image} posNo={2}/>
            </div>
        </div>
    )
}

function Image({url, posNo=1}){

    const imgRef = useRef(null)
    
    useEffect(()=>{
        
        setInterval(()=>{
            const parentPos = imgRef.current.parentElement.getBoundingClientRect()
            const imgPos = imgRef.current.getBoundingClientRect()

            if(imgPos.left+imgRef.current.width <= parentPos.left){
                let offset = (imgRef.current.width + 20) * posNo
                imgRef.current.style.right = `${-parentPos.width+offset}px`
            }else{
                let currentRight =  Number(imgRef.current.style.right.replace("px",""))
                imgRef.current.style.right = `${currentRight+1}px`
            }
        },30)
    },[])


    return (
        <img ref={imgRef} src={url} alt="" />
    )
}