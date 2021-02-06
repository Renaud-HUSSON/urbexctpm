import Link from 'next/link'
import ScrollContainer from 'react-indiana-drag-scroll'

const Lieu = ({ location, images }) => {
  return <section className="lieu">
    <h1>{location.title}</h1>
    <h2>Nous avons {images.length} images de ce lieu:</h2>
    <div className="lieu__images">
      <ScrollContainer vertical={false} className="lieu__images__scroll">
      {
        images.map(image => (
          <div className="lieu__images__scroll__item">
            <Link key={image.id} href={`/gallerie/${image.id}`}>
              <a>
                <img src={image.chemin} alt={image.titre}/>
                <p>{image.titre}</p>
              </a>
            </Link>
          </div>
        ))
      }
      </ScrollContainer>
    </div>
    <h2>Description du lieu:</h2>
    <p>{location.description}</p>
  </section>
}

export async function getStaticPaths(){
  const data = await fetch(`${process.env.BASE_API_URL}api/locations`)
  const json = await data.json()

  const paths = json.data.map(location => ({ params: { id: (location.id).toString() }}))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }){
  const id = params.id

  const locationData = await fetch(`${process.env.BASE_API_URL}api/locations/${id}`)
  const location = await locationData.json()

  const imagesData = await fetch(`${process.env.BASE_API_URL}api/images?filter={locationId: ${location.data.id}}`)
  const images = await imagesData.json()

  return {
    props: {
      location: location.data,
      images: images.data
    }
  }
}

export default Lieu