const ImageDetails = ({image}) => {
  return <section className="image-details">
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
}

export async function getStaticPaths(){
  const data = await fetch(`${process.env.BASE_API_URL}api/images?limit=1000000&fields=["id"]`)
  const json = await data.json()

  const paths = json.data.map(item => ({ params: { id: item.id.toString() } }))

  return { paths, fallback: false }
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