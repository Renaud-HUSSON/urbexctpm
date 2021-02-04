import { useEffect, useRef, useState } from "react"
import Loading from "../shared/Loading"

const LazyLoadImages = ({setImages, images, limit, category}) => {  
  const initialRender = useRef(true)
  
  useEffect(() => {
    if(initialRender.current){
      initialRender.current = false
      return
    }
    
    setPagination({
      page: 1,
      allLoaded: false
    })
  }, [category])
  
  const [pagination, setPagination] = useState({
    //make the page 2 because the first one is statically generated
    page: 2,
    allLoaded: images.length < limit
  })
  
  const handleClick = () => {
    //Run it only if the Loading component is visible and if all images have not been already loaded
    let url = `/api/images?limit=${limit}&page=${pagination.page}&fields=["id", "chemin", "titre"]`

    if(category !== ''){
      url += `&filter={categorieId: ${category}}`
    }

    fetch(url)
    .then(data => data.json())
    .then(json => {
      setPagination(pagination => {
        return {
          page: pagination.page + 1,
          allLoaded: json.data.length !== limit
        }
      })
      setImages(images => [...images, ...json.data])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return !pagination.allLoaded
    ?<div className="gallerie__see-more">
      <button onClick={handleClick} className="button">Voir plus</button>
    </div>
    :<>
      {
        images.length === 0
        ?<div className="gallerie__not-found">
          <p>Aucune image n'a été trouvé</p>
          <div>
            <Loading />
          </div>
        </div>
        :<></>
      }
    </>
}

export default LazyLoadImages