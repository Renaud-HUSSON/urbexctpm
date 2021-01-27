import { Link } from "react-router-dom"

const PresentationGalerie = () => {
  return <section className="presentation-galerie">
    <div className="presentation-galerie__text">
      <h2>DÉCOUVREZ MES PHOTOS D'URBEX</h2>
      <Link className="button" to="/gallerie">VOIR LA GALLERIE</Link>
    </div>
    <div className="carousel">
      <svg width="37" height="68" viewBox="0 0 37 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 2L3 34L35 66" stroke="black" strokeWidth="3"/>
      </svg>

      <div className="carousel__images">
        <img src={`${process.env.PUBLIC_URL}/urbex1.jpg`} alt="urbex" />
        <img className="carousel__images--active" src={`${process.env.PUBLIC_URL}/urbex2.jpg`} alt="urbex" />
        <img src={`${process.env.PUBLIC_URL}/urbex3.jpg`} alt="urbex" />
      </div>

      <svg width="37" height="68" viewBox="0 0 37 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 66L34 34L2 2" stroke="black" strokeWidth="3"/>
      </svg>
    </div>
  </section>
}

export default PresentationGalerie