import { useEffect, useRef, useState } from "react"
import CategorySelect from "../../components/Gallerie/CategorySelect"
import GallerieImage from "../../components/Gallerie/GallerieImage"
import LazyLoadImages from "../../components/Gallerie/LazyLoadImages"
import Loading from "../../components/shared/Loading"

const Gallerie = ({ imagesProps, limit, categoriesProps }) => {    
  const gallerie = useRef()

  const [images, setImages] = useState(imagesProps)
  const [category, setCategory] = useState('')

  useEffect(() => {
    setImages([])
  }, [category])

  return <section className="gallerie">
    <div className="gallerie__header">
      <h1>LA GALLERIE</h1>
      <CategorySelect setCategory={setCategory} categories={categoriesProps}/>
    </div>
    {
      images.length !== 0
      ?<div className="gallerie__images" ref={gallerie}>
        {
          images.map(image => {
            return <GallerieImage key={image.id} image={image}/>
          })
        }
      </div>
      :<div className="gallerie__not-found">
        <p>Aucune image n'a été trouvé</p>
        <Loading />
      </div>
    }
    <LazyLoadImages setImages={setImages} limit={limit} images={images} category={category}/>
  </section>
}

export async function getStaticProps(){
  const LIMIT = 12
  
  const imagesData = await fetch(`${process.env.BASE_API_URL}api/images?limit=${LIMIT}`)
  const images = await imagesData.json()

  const categoriesData = await fetch(`${process.env.BASE_API_URL}api/categories`)
  const categories = await categoriesData.json()

  return {
    props: {
      imagesProps: images.data,
      categoriesProps: categories.data,
      limit: LIMIT
    },
    revalidate: 1
  }
}

export default Gallerie