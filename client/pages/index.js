import Presentation from "../components/Home/Presentation"
import PresentationCarte from "../components/Home/PresentationCarte"
import PresentationGalerie from "../components/Home/PresentationGallerie"

const Home = () => {
  return <div className="homepage">
    <PresentationGalerie />
    <Presentation />
    <PresentationCarte />
  </div>
}

export default Home