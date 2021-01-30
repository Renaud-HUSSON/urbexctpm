import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Nav from "./Nav"

const Header = () => {
  const [nav, setNav] = useState(false)
  
  const location = useRouter()

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
  }, [location])
  
  return <header>
    <Link href="/">urbexctpm</Link>
    <div className={`burger ${nav ?'light' : ''}`} onClick={handleClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <Nav nav={nav}/>
  </header>
}

export default Header