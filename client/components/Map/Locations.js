import useGetData from '../../hooks/useGetData'
import Loading from '../shared/Loading'

const Locations = ({currentRegion, regions}) => {
  const locations = useGetData(`/api/locations?filter={regionId: ${currentRegion}}`)

  return !locations.loading
  ?<div className="map__informations__locations">
    {
      locations.data.data.length !== 0
      ?locations.data.data.map(location => (
        <div className="map__informations__locations__item">
          <h2>{location.title}</h2>
          <p>{location.description}</p>
        </div>
      ))
      :<p>Nous n'avons aucun lieu se situant dans la région: {regions[currentRegion - 1].nom}</p>
    }
  </div>
  :<Loading />
}

export default Locations