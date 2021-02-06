import useGetData from '../../hooks/useGetData'
import Loading from '../shared/Loading'
import Link from 'next/link'

const Locations = ({currentRegion, regions}) => {
  const locations = useGetData(`/api/locations?filter={regionId: ${currentRegion}}`)

  return !locations.loading
  ?<div className="map__informations__locations">
    {
      locations.data.data.length !== 0
      ?locations.data.data.map(location => (
        <div key={location.id} className="map__informations__locations__item">
          <h2>{location.title}</h2>
          <p>{location.description}</p>
          <Link href={`/lieu/${location.id}`}>
            <a>
              En savoir plus
            </a>
          </Link>
        </div>
      ))
      :<p>Nous n'avons aucun lieu se situant dans la région: {regions[currentRegion - 1].nom}</p>
    }
  </div>
  :<Loading />
}

export default Locations