import { Link } from "react-router-dom"
import Carousel from "./Carousel"
import { v4 as uuid } from 'uuid';

const PresentationGalerie = () => {
  return <section className="presentation-galerie">
    <div className="presentation-galerie__text">
      <h2>DÉCOUVREZ MES PHOTOS D'URBEX</h2>
      <Link className="button" to="/gallerie">VOIR LA GALLERIE</Link>
    </div>
    
    <Carousel>
      <img className="1" key={uuid()} src={`${process.env.PUBLIC_URL}/urbex1.jpg`} alt="urbex" />
      <img className="2" key={uuid()} src={`${process.env.PUBLIC_URL}/urbex2.jpg`} alt="urbex" />
      <img className="3" key={uuid()} src={`${process.env.PUBLIC_URL}/urbex3.jpg`} alt="urbex" />
    </Carousel>

  </section>
}

export default PresentationGalerie