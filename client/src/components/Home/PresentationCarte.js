import { Link } from "react-router-dom"

const PresentationCarte = () => {
  return <section className="presentation-carte">
    <img src={`${process.env.PUBLIC_URL}/map.svg`} alt=""/>
    <div className="presentation-carte__text">
      <h2>DÉCOUVREZ QUELQUES LIEUX TRÈS CONNUS</h2>
      <Link className="button" to="/carte">VOIR LA CARTE</Link>
    </div>
  </section>
}

export default PresentationCarte