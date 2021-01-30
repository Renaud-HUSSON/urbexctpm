import Link from 'next/link'

const Nav = ({nav}) => {
  return <nav className={nav ? 'active' : ''}>
    <ul>
      <li><Link href="/">Accueil</Link></li>
      <li><Link href="/gallerie">Gallerie</Link></li>
      <li><Link href="/carte">Carte</Link></li>
    </ul>
  </nav>
}

export default Nav