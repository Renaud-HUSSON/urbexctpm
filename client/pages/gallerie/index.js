import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import CategorySelect from "../../components/Gallerie/CategorySelect"
import GallerieImage from "../../components/Gallerie/GallerieImage"
import LazyLoadImages from "../../components/Gallerie/LazyLoadImages"

const Gallerie = ({ imagesProps, limit, categoriesProps }) => {    
  const initialRender = useRef(true)
  const gallerie = useRef()

  const [images, setImages] = useState(imagesProps)
  const [category, setCategory] = useState('')
  
  useEffect(() => {
    if(initialRender.current){
      initialRender.current = false
      return
    }
    
    setImages([])
  }, [category])

  return <section className="gallerie">
    <Head>
      <title>Gallerie - urbexctpm</title>
      <meta name="description" content="Cette page présente notre gallerie de photo, qui peuvent être filtrés par catégories, et qui permet d'accéder aux détails de chaque image" />

      <meta property="og:url" content="https:/urbexctpm.fr/gallerie" />
      <meta property="og:title" content="Gallerie - urbexctpm" />
      <meta property="og:description" content="Cette page présente notre gallerie de photo, qui peuvent être filtrés par catégories, et qui permet d'accéder aux détails de chaque image" />
      <meta property="twitter:url" content="https:/urbexctpm.fr/gallerie" />
      <meta property="twitter:title" content="Gallerie - urbexctpm" />
      <meta property="twitter:description" content="Cette page présente notre gallerie de photo, qui peuvent être filtrés par catégories, et qui permet d'accéder aux détails de chaque image" />
    </Head>
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
      :<></>
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