import Link from "next/link"
import Carousel from "./Carousel"
import { v4 as uuid } from 'uuid';

const PresentationGalerie = ({carouselImages}) => {
  return <section className="presentation-galerie">
    <div className="presentation-galerie__text">
      <h2>DÉCOUVREZ MES PHOTOS D'<span>URBEX</span></h2>
      <Link href="/galerie">
        <a className="button">VOIR LA <span>galerie</span></a>
      </Link>
    </div>
    
    <Carousel>
      {
        carouselImages.map(image => (
          <img key={uuid()} src={image.image.chemin} alt={image.image.titre} />
        ))
      }
    </Carousel>

  </section>
}

export default PresentationGalerie