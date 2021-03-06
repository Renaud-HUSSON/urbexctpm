import Link from 'next/link'
import ScrollContainer from 'react-indiana-drag-scroll'
import Head from 'next/head'
import Ga from '../../components/Ga'

const Lieu = ({ location, images }) => {  
  return <Ga>
    <section className="lieu">
      <Head>
        <title>{location?.title ?? ''} - urbexctpm</title>
        <meta name="description" content={location?.description ?? ''}/>
      </Head>
      <h1>{location?.title ?? ''}</h1>
      <h2>Nous avons {images?.length ?? ''} images de ce lieu:</h2>
      <div className="lieu__images">
        <ScrollContainer vertical={false} className="lieu__images__scroll">
        {
          images?.map(image => {
            const src = image.chemin.replace(/(\/\w+\/)(.+[.][jpg|jpeg|png])/, '$1thumbnails/$2')

            return <div key={image.id} className="lieu__images__scroll__item">
              <Link key={image.id} href={`/galerie/${image.id}`}>
                <a>
                  <img src={src} alt={image.titre}></img>
                  <p>{image.titre}</p>
                </a>
              </Link>
            </div>
          })
        }
        </ScrollContainer>
      </div>
      <h2>Description du lieu:</h2>
      <p>{location?.description ?? ''}</p>
    </section>
  </Ga> 
}

export async function getStaticPaths(){
  const data = await fetch(`${process.env.BASE_API_URL}api/locations`)
  const json = await data.json()

  let paths = []

  paths = json.data.map(location => ({ params: { id: (location.id).toString() }}))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }){
  const { id } = params
  let location = {}
  let images = []

  try {
    const locationData = await fetch(`${process.env.BASE_API_URL}api/locations/${id}`)
    location = await locationData.json()
  
    const imagesData = await fetch(`${process.env.BASE_API_URL}api/images?filter={locationId: ${location.data.id}}`)
    images = await imagesData.json()
  }catch(_){}

  return {
    props: {
      location: location?.data ?? {},
      images: images?.data ?? []
    },
    revalidate: 1
  }
}

export default Lieu