import Link from "next/link"
import { useInView } from 'react-intersection-observer';

const galerieImage = ({image}) => {
  //Thumbnail's path
  const src = image.chemin.replace(/(\/\w+\/)(.+[.][jpg|jpeg|png])/, '$1thumbnails/$2')

  const { ref, inView } = useInView({   
    threshold: 0.1,
    rootMargin: '0px'
  });

  return <Link href={`/galerie/${image.id}`}>
    <a className={`galerie__images__item ${inView ? 'appear' : 'intersection-observer'}`} ref={ref}>
      <div className="hover">
        <p>{image.titre}</p>
      </div>
      
      <picture>
      <source media="(max-width: 1280px)" srcSet={src}/>
      <source media="(min-width: 1281px)" srcSet={image.chemin}/>
        <img src={src} alt={image.titre}/>
      </picture>
    </a>
  </Link>
}

export default galerieImage