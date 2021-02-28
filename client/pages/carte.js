import Map from "../components/Map/Map"
import { useState } from 'react'
import MapInformations from "../components/Map/MapInformations"
import withAuth from "../components/HOC/withAuth"
import Head from "next/head"
import Ga from "../components/Ga"

const carte = ({regions}) => {
  const [currentRegion, setCurrentRegion] = useState(null)

  return <Ga>
    <section className="map">
      <Head>
        <title>La carte - urbexctpm</title>
        <meta name="description" content="Découvrez sur cette carte plusieurs lieux d'urbex, dans toutes les régions de France"/>

        <meta property="og:url" content="https:/urbexctpm.fr/carte" />
        <meta property="og:title" content="La carte - urbexctpm" />
        <meta property="og:description" content="Découvrez sur cette carte plusieurs lieux d'urbex, dans toutes les régions de France" />
        <meta property="twitter:url" content="https:/urbexctpm.fr/carte" />
        <meta property="twitter:title" content="La carte - urbexctpm" />
        <meta property="twitter:description" content="Découvrez sur cette carte plusieurs lieux d'urbex, dans toutes les régions de France" />
      </Head>
    
      <Map currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
      <MapInformations regions={regions} currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
    </section> 
  </Ga> 
}

export async function getStaticProps() {
  const data = await fetch(`${process.env.BASE_API_URL}api/regions`)
  const json = await data.json()

  return {
    props: {
      regions: json.data
    }
  }
}

export default carte