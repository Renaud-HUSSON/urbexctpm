import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import Nav from "./Nav"

const Header = () => {
  const [nav, setNav] = useState(false)
  
  const handleClick = useCallback(() => {
    setNav(nav => !nav)
  }, [])
  
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