import Link from "next/link"
import { useInView } from 'react-intersection-observer';

const GallerieImage = ({image}) => {
  //Thumbnail's path
  const src = image.chemin.replace(/(\/\w+\/)(.+[.][jpg|jpeg|png])/, '$1thumbnails/$2')

  const { ref, inView } = useInView({   
    threshold: 0.1,
    rootMargin: '0px'
  });

  return <Link href={`/gallerie/${image.id}`}>
    <a className={`gallerie__images__item ${inView ? 'appear' : 'intersection-observer'}`} ref={ref}>
      <div className="hover">
        <p>{image.titre}</p>
      </div>
      
      <img src={src} alt={image.titre}/>
    </a>
  </Link>
}

export default GallerieImage