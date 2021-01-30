import Loading from "../../components/shared/Loading"
import useGetData from '../../hooks/useGetData'
import { useRouter } from 'next/router'

const ImageDetails = () => {
  const id = useRouter().query.id
  const url = `/api/images/${id}`

  const image = useGetData(url)

  return !image.loading
  ?<section className="image-details">
    <picture>
      <source media="(min-width: 421px)" srcSet={image.data.data.chemin}/>
      <source media="(max-width: 420px)" srcSet={image.data.data.chemin.replace(/(\/\w+\/)(.+[.][jpg|jpeg|png])/, '$1thumbnails/$2')}/>
      <img src={image.data.data.chemin} alt={image.data.data.titre}/>
    </picture>
    <div>
      <h1>{image.data.data.titre}</h1>
      <pre>{image.data.data.description}</pre>
    </div>
  </section>
  :<Loading />
}

export default ImageDetails