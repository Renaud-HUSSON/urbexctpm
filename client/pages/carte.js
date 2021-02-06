import Map from "../components/Map/Map"
import { useState } from 'react'
import MapInformations from "../components/Map/MapInformations"

const carte = ({regions}) => {
  const [currentRegion, setCurrentRegion] = useState(null)

  return <section className="map">
    <Map currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
    <MapInformations regions={regions} currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
  </section> 
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