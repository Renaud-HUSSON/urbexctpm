import Presentation from "../components/Home/Presentation"
import PresentationCarte from "../components/Home/PresentationCarte"
import PresentationGalerie from "../components/Home/PresentationGallerie"

const Home = ({carouselImages}) => {
  return <div className="homepage">
    <PresentationGalerie carouselImages={carouselImages}/>
    <Presentation />
    <PresentationCarte />
  </div>
}

export async function getStaticProps(){
  const res = await fetch(`${process.env.BASE_API_URL}api/carousel?limit=100`)
  const json = await res.json()

  console.log(json)

  return {
    props: {
      carouselImages: json.data
    }
  }
}

export default Home