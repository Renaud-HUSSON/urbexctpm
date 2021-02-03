import Link from "next/link"
import Carousel from "./Carousel"
import { v4 as uuid } from 'uuid';

const PresentationGalerie = ({carouselImages}) => {
  return <section className="presentation-galerie">
    <div className="presentation-galerie__text">
      <h2>DÉCOUVREZ MES PHOTOS D'URBEX</h2>
      <Link href="/gallerie">
        <a className="button">VOIR LA GALLERIE</a>
      </Link>
    </div>
    
    <Carousel>
      {
        carouselImages.map(image => (
          <img key={uuid()} src={image.chemin} alt={image.titre} />
        ))
      }
    </Carousel>

  </section>
}

export default PresentationGalerie