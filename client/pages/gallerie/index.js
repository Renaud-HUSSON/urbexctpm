import { useRef, useState } from "react"
import GallerieImage from "../../components/Gallerie/GallerieImage"
import LazyLoadImages from "../../components/Gallerie/LazyLoadImages"

const Gallerie = ({ imagesProps, limit }) => {    
  const gallerie = useRef()
    
  const [images, setImages] = useState(imagesProps)

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
    <LazyLoadImages setImages={setImages} limit={limit} images={images} />
  </section>
}

export async function getStaticProps(){
  const LIMIT = 12
  
  const data = await fetch(`${process.env.BASE_API_URL}api/images?limit=${LIMIT}`)
  const json = await data.json()

  return {
    props: {
      imagesProps: json.data,
      limit: LIMIT
    },
    revalidate: 1
  }
}

export default Gallerie