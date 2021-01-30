import Link from "next/link"

const PresentationCarte = () => {
  return <section className="presentation-carte">
    <img src='/map.svg' alt=""/>
    <div className="presentation-carte__text">
      <h2>DÉCOUVREZ QUELQUES LIEUX TRÈS CONNUS</h2>
      <Link href="/carte">
        <a className="button">VOIR LA CARTE</a>
      </Link>
    </div>
  </section>
}

export default PresentationCarte