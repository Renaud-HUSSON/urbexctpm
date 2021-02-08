import Head from "next/head"
import Ga from "../components/Ga"
import Presentation from "../components/Home/Presentation"
import PresentationCarte from "../components/Home/PresentationCarte"
import PresentationGalerie from "../components/Home/PresentationGallerie"

const Home = ({carouselImages}) => {
  
  return <Ga>
    <div className="homepage">
    <Head>
      <title>Accueil - urbexctpm</title>
      <meta name="description" content="Retrouvez sur ce site pleins de photos d'urbex, ainsi que quelques lieux que nous partageons"/>

      <meta property="og:url" content="https:/urbexctpm.fr/" />
      <meta property="og:title" content="Accueil - urbexctpm" />
      <meta property="og:description" content="Retrouvez sur ce site pleins de photos d'urbex, ainsi que quelques lieux que nous partageons" />
      <meta property="twitter:url" content="https:/urbexctpm.fr/" />
      <meta property="twitter:title" content="Accueil - urbexctpm" />
      <meta property="twitter:description" content="Retrouvez sur ce site pleins de photos d'urbex, ainsi que quelques lieux que nous partageons" />
    </Head>
      <PresentationGalerie carouselImages={carouselImages}/>
      <Presentation />
      <PresentationCarte />
    </div>
  </Ga>
}

export async function getStaticProps(){
  const res = await fetch(`${process.env.BASE_API_URL}api/carousel?limit=100`)
  const json = await res.json()

  return {
    props: {
      carouselImages: json.data
    }
  }
}

export default Home