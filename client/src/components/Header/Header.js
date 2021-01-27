import { useCallback, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Nav from "./Nav"

const Header = () => {
  const [nav, setNav] = useState(false)
  
  const location = useLocation()

  const handleClick = useCallback(() => {
    setNav(nav => !nav)
  }, [])

  useEffect(() => {
    nav
    ?document.body.setAttribute('noscroll', true)
    :document.body.removeAttribute('noscroll')
  }, [nav])
  
  useEffect(() => {
    setNav(false)
  }, [location.key])
  
  return <header>
    <Link to="/">urbexctpm</Link>
    <div className={`burger ${nav ?'light' : ''}`} onClick={handleClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <Nav nav={nav}/>
  </header>
}

export default Header