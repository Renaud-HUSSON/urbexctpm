import Link from 'next/link'
import { useContext } from 'react'
import { FlashContext } from '../../context/Flash'
import { LoggedContext } from '../../context/Logged'

const Nav = ({nav, setNav}) => {
  const [logged, setLogged] = useContext(LoggedContext)
  const [, setFlash] = useContext(FlashContext)

  const handleClick = async () => {
    const data = await fetch('/api/auth/logout')
    const json = await data.json()

    setNav(false)
    setLogged({logged: false, data: ''})
    setFlash({active: true, success: json.success, message: json.message})
  }

  const handleClickAdmin = () => {
    window.location.pathname = '/admin'
  }
  
  return <nav className={nav ? 'active' : ''}>
    <ul>
      <li><Link href="/">Accueil</Link></li>
      <li><Link href="/gallerie">Gallerie</Link></li>
      <li><Link href="/carte">Carte</Link></li>
      {
        logged.logged
        ?<>
          <li><Link href="/profil">Mon profil</Link></li>
          <li><button onClick={handleClick}>Se déconnecter</button></li>
          {
            logged.data.role === 'admin'
            ?<li><button onClick={handleClickAdmin}>Admin</button></li>
            :<></>
          }
        </>
        :<>
          <li><Link href="/connexion">Se connecter</Link></li>
          <li><Link href="/inscription">S'inscrire</Link></li>
        </>
      }
    </ul>
  </nav>
}

export default Nav