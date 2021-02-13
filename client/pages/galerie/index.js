import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import CategorySelect from "../../components/Galerie/CategorySelect"
import GalerieImage from "../../components/Galerie/GalerieImage"
import LazyLoadImages from "../../components/Galerie/LazyLoadImages"
import Ga from '../../components/Ga'

const galerie = ({ imagesProps, limit, categoriesProps }) => {    
  const initialRender = useRef(true)
  const galerie = useRef()

  const [images, setImages] = useState(imagesProps)
  const [category, setCategory] = useState('')
  
  useEffect(() => {
    if(initialRender.current){
      initialRender.current = false
      return
    }
    
    setImages([])
  }, [category])

  return <Ga>
    <section className="galerie">
      <Head>
        <title>galerie - urbexctpm</title>
        <meta name="description" content="Cette page présente notre galerie de photo, qui peuvent être filtrés par catégories, et qui permet d'accéder aux détails de chaque image" />
  
        <meta property="og:url" content="https:/urbexctpm.fr/galerie" />
        <meta property="og:title" content="galerie - urbexctpm" />
        <meta property="og:description" content="Cette page présente notre galerie de photo, qui peuvent être filtrés par catégories, et qui permet d'accéder aux détails de chaque image" />
        <meta property="twitter:url" content="https:/urbexctpm.fr/galerie" />
        <meta property="twitter:title" content="galerie - urbexctpm" />
        <meta property="twitter:description" content="Cette page présente notre galerie de photo, qui peuvent être filtrés par catégories, et qui permet d'accéder aux détails de chaque image" />
      </Head>
      <div className="galerie__header">
        <h1>LA galerie</h1>
        <CategorySelect setCategory={setCategory} categories={categoriesProps}/>
      </div>
      {
        images.length !== 0
        ?<div className="galerie__images" ref={galerie}>
          {
            images.map(image => {
              return <GalerieImage key={image.id} image={image}/>
            })
          }
        </div>
        :<></>
      }
      <LazyLoadImages setImages={setImages} limit={limit} images={images} category={category}/>
    </section>
  </Ga> 
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

export default galerie