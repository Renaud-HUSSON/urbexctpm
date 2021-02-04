import Link from "next/link"

const Footer = () => {
  return <footer>
    <div>
      <div className="pages">
        <Link href="/">Accueil</Link>
        <Link href="/gallerie">Gallerie</Link>
        <Link href="/carte">Carte</Link>
      </div>
      <div className="separator"></div>
      <div>
        <Link href="/newsletter">Newsletter</Link>
      </div>
      <div className="separator"></div>
      <div>
        <a href="https://www.instagram.com/urbexctpm/" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </div>
  </footer>
}

export default Footer