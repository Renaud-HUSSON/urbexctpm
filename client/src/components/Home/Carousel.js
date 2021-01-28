import { cloneElement, useRef, useState } from "react"

//TODO: get this carousel not to be a mess and actually understandable
const Carousel = ({children}) => {
  const carouselImages = useRef()

  //Carousel items to make it infinite
  const childrenArray = [
    cloneElement(children[children.length - 2], { key: '09739278632387635763533' }),
    cloneElement(children[children.length - 1], { key: '0973927863287635763533' }),
    cloneElement(children[0], { className: (children[0].props.className || '') + ' carousel__images--active' }),
    ...children.slice(1, children.length),
  ]

  children.slice(0, children.length - 2).forEach((child, i) => {
    return childrenArray.push(cloneElement(child, { key: i * 212122.098763 }))
  })
  
  const [currentItem, setCurrentItem] = useState(2)

  //Removes the active class, and adds it to concerned items
  const handleActiveClass = (item, i, imageIndex, currentItem) => {
    item.style.transition = '0s'
    
    if(currentItem%childrenArray.length === i){
      item.classList.remove('carousel__images--active')
      item.style.transition = '0.4s'
    }

    if((currentItem + 1)%childrenArray.length === i ||
      (currentItem - 1 + childrenArray.length)%childrenArray.length === i){
      item.style.transition = '0.4s'
    }
    
    if(imageIndex%childrenArray.length === i){
      item.classList.add('carousel__images--active')
    }
  }

  //Goes to the previous item
  const previousItem = () => {
    //Get following image index
    const imageIndex = (currentItem + childrenArray.length - 1)%childrenArray.length
    
    let size = 0
    
    //Moves every images to the left
    carouselImages.current.querySelectorAll('img').forEach((item, i) => {
      item.style.left = parseInt(item.style.left || - 1 * item.scrollWidth) + item.scrollWidth + 'px'

      handleActiveClass(item, i, imageIndex, currentItem)

      size += item.scrollWidth
    })
    
    //I've no idea how it is working, but it is ! 
    const lastItem = carouselImages.current.querySelectorAll('img')[(currentItem + (childrenArray.length - 3))%childrenArray.length]
    lastItem.style.left = (parseInt(lastItem.style.left) || 0) - size + 'px'
    
    setCurrentItem(imageIndex)
  }
  
  //Goes to the next item
  const nextItem = () => {
    //Get following image index
    const imageIndex = (currentItem + 1)%childrenArray.length

    let size = 0
    
    //Moves every images to the left
    carouselImages.current.querySelectorAll('img').forEach((item, i) => {
      item.style.left = parseInt(item.style.left || - 1 * item.scrollWidth) - item.scrollWidth + 'px'

      handleActiveClass(item, i, imageIndex, currentItem)

      size += item.scrollWidth
    })
    
    //I've no idea how it is working, but it is !
    const lastItem = carouselImages.current.querySelectorAll('img')[(((currentItem + (childrenArray.length - 3))%childrenArray.length) + 1)%(childrenArray.length)]
    lastItem.style.left = (parseInt(lastItem.style.left) || 0) + size + 'px'
    
    setCurrentItem(imageIndex)
  }
  
  return <div className="carousel">
  <svg onClick={previousItem} width="37" height="68" viewBox="0 0 37 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 2L3 34L35 66" stroke="black" strokeWidth="3"/>
  </svg>

  <div className="carousel__images" ref={carouselImages}>
    {childrenArray}
  </div>

  <svg onClick={nextItem} width="37" height="68" viewBox="0 0 37 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 66L34 34L2 2" stroke="black" strokeWidth="3"/>
  </svg>
</div>
}

export default Carousel