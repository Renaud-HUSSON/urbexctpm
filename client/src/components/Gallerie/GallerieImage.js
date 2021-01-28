import { Link } from "react-router-dom"
import { useInView } from 'react-intersection-observer';

const GallerieImage = ({image}) => {
  const { ref, inView } = useInView({   
    threshold: 0.1,
    rootMargin: '0px'
  });

  return <Link className={`gallerie__item ${inView ? 'appear' : 'intersection-observer'}`} to={`/gallerie/${image.id}`} ref={ref}>
    <div className="hover">
      <p>{image.titre}</p>
    </div>
  
    <img src={image.chemin} alt={image.titre}/>
  </Link>
}

export default GallerieImage