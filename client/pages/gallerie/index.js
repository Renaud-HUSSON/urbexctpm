import { useRef, useState } from "react"
import GallerieImage from "../../components/Gallerie/GallerieImage"
import LazyLoadImages from "../../components/Gallerie/LazyLoadImages"

const Gallerie = () => {  
  const gallerie = useRef()
    
  const [images, setImages] = useState([])

  return <section className="gallerie">
    <h1>LA GALLERIE</h1>
    {
      images.length !== 0
      ?<div className="gallerie__images" ref={gallerie}>
        {
          images.map(image => {
            return <GallerieImage key={image.id} image={image} />
          })
        }
      </div>
      :<></>
    }
    <LazyLoadImages setImages={setImages} />
  </section>
}

export default Gallerie