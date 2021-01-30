import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import Loading from "../shared/Loading"

const LazyLoadImages = ({setImages}) => {
  //TODO: Make an option for the user to pick the limit
  const LIMIT = 12
  
  //Used to prevent multipile images calls to the api for nothing on the first render
  const [initialRender, setInitialRender] = useState(true)
  
  const [pagination, setPagination] = useState({
    page: 1,
    allLoaded: false
  })
  
  const { ref, inView } = useInView({
    threshold: 1
  })
  
  useEffect(() => {
    //Run it only if the Loading component is visible, if it isn't the first render, and if all images have not been already loaded
    if(inView && !initialRender && !pagination.allLoaded){
      fetch(`/api/images?limit=${LIMIT}&page=${pagination.page}&fields=["id", "chemin", "titre"]`)
      .then(data => data.json())
      .then(json => {
        setPagination(pagination => {
          return {
            page: pagination.page + 1,
            allLoaded: json.data.length !== LIMIT
          }
        })
        setImages(images => [...images, ...json.data])
      })
    }else{
      setInitialRender(false)
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