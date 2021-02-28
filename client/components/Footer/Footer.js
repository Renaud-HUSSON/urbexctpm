import Link from "next/link"

const Footer = () => {
  return <footer>
    <div className="footer__content">
      <div className="pages">
        <Link href="/">Accueil</Link>
        <Link href="/galerie">Galerie</Link>
        <Link href="/carte">Carte</Link>
      </div>
      <div className="separator"></div>
      <div>
        <Link href="/newsletter">Newsletter</Link>
      </div>
      <div className="separator"></div>
      <div>
        <a href="https://www.instagram.com/urbexctpm/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="mailto:simonloth@outlook.fr">Me contacter par mail:</a>
        <a href="mailto:urbexctpm@gmail.com">urbexctpm@gmail.com</a>
      </div>
    </div>
    <div className="footer__credit">
    <p>Site réalisé par <strong><a target="_blank" rel="noreferrer" href="https://renaudhusson.fr">Renaud HUSSON</a></strong></p>
    </div>
  </footer>
}

export default Footer