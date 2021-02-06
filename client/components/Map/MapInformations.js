import Locations from "./Locations"
import RegionSelect from "./RegionSelect"

const MapInformations = ({regions, currentRegion, setCurrentRegion}) => {
  return <div className="map__informations">
  
  <RegionSelect regions={regions} setCurrentRegion={setCurrentRegion} currentRegion={currentRegion}/>
    {
      currentRegion
      ?<div>
        <h1>Lieux d'urbex dans la région: {regions[currentRegion - 1].nom}</h1>
        <Locations currentRegion={currentRegion} regions={regions}/>
      </div>
      :<p>
        Veuillez sélectionner une région
      </p>
    }
  </div>
}

export default MapInformations