import './Home.css'
import { Link } from 'react-router'
import Slider from './InfiniteSlider.jsx'
export default function Home(){
    return (
        <main>
            <section data-testid="photo" className="main-photo"> 
                <h1 className='welcome'>Welcome to myshop!</h1>
                <h1 className='discover'><a href="#content">More</a>
                    <span className="material-symbols-outlined more-symbol">
                        arrow_downward
                    </span>
                </h1>
            </section>
            <section id="content">
                <Slider title='Offers'/>
                <section className="about">
                    <h2><span>What you can find here</span></h2>
                    <section className="content">
                        <div className="clothing item">
                            <img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png" className="picture" alt="Clothing" />
                            <div className='info'>
                                <p>
                                    Find a varierty of cool clothes for men and women: jackets,
                                    jeans, shirts accesories and more!
                                </p>
                                
                            </div>
                        </div>
                        <div className="jewelry item">
                            <div className='info'>
                                <p>
                                    Take a look to our jewelry, bracelets and rings,
                                    into a variety of nice materials and bright colors. 
                                </p>
                                
                            </div>
                            <img src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png" className="picture" alt="Jewely" />
                        </div>
                        <div className="electronics item">
                            <img src="https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png" className="picture" alt="Electronics" />
                            <div className='info'>
                                <p>
                                    Monitors, SSDs and hard drives for your necessity, all 
                                    in an excelent price!
                                </p>
                                
                            </div>
                        </div>
                    </section>
                </section>
            </section>

              
        </main>
    )
}