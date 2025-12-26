import './Home.css'
import { Link } from 'react-router'
import Slider from './InfiniteSlider.jsx'
export default function Home(){
    return (
        <main>
            
            <section className="main-photo">
                
                
                <h1 className='welcome'>Welcome to myshop!</h1>
                <h1 className='discover'><a href="#content">More</a>
                    <span className="material-symbols-outlined more-symbol">
                        arrow_downward
                        
                    </span>
                </h1>
            </section>
            <section id="content">
                <Slider title='Offers'/>
            </section>

              
        </main>
    )
}