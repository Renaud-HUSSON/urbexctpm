import Link from "next/link"
import Carousel from "./Carousel"
import { v4 as uuid } from 'uuid';

const PresentationGalerie = () => {
  return <section className="presentation-galerie">
    <div className="presentation-galerie__text">
      <h2>DÉCOUVREZ MES PHOTOS D'URBEX</h2>
      <Link href="/gallerie">
        <a className="button">VOIR LA GALLERIE</a>
      </Link>
    </div>
    
    <Carousel>
      <img className="1" key={uuid()} src='/urbex1.jpg' alt="urbex" />
      <img className="2" key={uuid()} src='/urbex2.jpg' alt="urbex" />
      <img className="3" key={uuid()} src='/urbex3.jpg' alt="urbex" />
    </Carousel>

  </section>
}

export default PresentationGalerie