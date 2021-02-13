import Head from "next/head"
import Ga from "../../components/Ga"

const ImageDetails = ({image={chemin: ''}}) => {
  return <Ga>
    <section className="image-details">
      <Head>
        <title>{image.titre} - urbexctpm</title>
        <meta name="description" content={image.description !== '' ? image.description : `Cette page présente les détails de la photo suivante: ${image.title}`} />

        <meta property="og:url" content={`https:/urbexctpm.fr/Galerie/${image.id}`} />
        <meta property="og:title" content={`${image.titre} - urbexctpm`} />
        <meta property="og:description" content={image.description !== '' ? image.description : `Cette page présente les détails de la photo suivante: ${image.title}`} />
        <meta property="twitter:url" content={`https:/urbexctpm.fr/Galerie/${image.id}`} />
        <meta property="twitter:title" content={`${image.titre} - urbexctpm`} />
        <meta property="twitter:description" content={image.description !== '' ? image.description : `Cette page présente les détails de la photo suivante: ${image.title}`} />
      </Head>
      <picture>
        <source media="(min-width: 421px)" srcSet={image.chemin}/>
        <source media="(max-width: 420px)" srcSet={image.chemin.replace(/(\/\w+\/)(.+[.][jpg|jpeg|png])/, '$1thumbnails/$2')}/>
        <img src={image.chemin} alt={image.titre}/>
      </picture>
      <div>
        <h1>{image.titre}</h1>
        {
          image.location
          ?<p>Lieu: {image.location.title}</p>
          :<></>
        }
        {
          image.categorie
          ?<p>Catégorie: {image.categorie.titre}</p>
          :<></>
        }
        <pre>{image.description}</pre>
      </div>
    </section>
  </Ga> 
}

export async function getStaticPaths(){
  const data = await fetch(`${process.env.BASE_API_URL}api/images?limit=1000000&fields=["id"]`)
  const json = await data.json()

  let paths = []

  paths = json.data.map(item => ({ params: { id: item.id.toString() } }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }){
  const data = await fetch(`${process.env.BASE_API_URL}api/images/${params.id}`)
  const json = await data.json()

  return {
    props: {
      image: json.data
    },
    revalidate: 1
  }
}

export default ImageDetails