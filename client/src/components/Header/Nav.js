import { Link } from 'react-router-dom'

const Nav = ({nav}) => {
  return <nav className={nav ? 'active' : ''}>
    <ul>
      <li><Link to="/accueil">Accueil</Link></li>
      <li><Link to="/gallerie">Gallerie</Link></li>
      <li><Link to="/gallerie">Carte</Link></li>
    </ul>
  </nav>
}

export default Nav