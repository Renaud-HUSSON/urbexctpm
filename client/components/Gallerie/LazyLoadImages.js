import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import Loading from "../shared/Loading"

const LazyLoadImages = ({setImages, images, limit, category}) => {  
  //Used to prevent multipile images calls to the api for nothing on the first render
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
  
  const { ref, inView } = useInView({
    threshold: 1
  })
  
  useEffect(() => {
    if(initialRender.current){
      initialRender.current = false
      return
    }
    
    //Run it only if the Loading component is visible and if all images have not been already loaded
    if(inView && !pagination.allLoaded){
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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])
  
  return !pagination.allLoaded
    ?<div className="gallerie-loading" ref={ref}>
      <Loading />
    </div>
    :<></>
}

export default LazyLoadImages