import Select from "react-dropdown-select";

const RegionSelect = ({regions, currentRegion, setCurrentRegion}) => {
  const options = regions.map(region => {
    return { key: region.id, id: region.id, nom: region.nom }
  })

  const handleChange = e => {
    setCurrentRegion(e[0].id)
  }
  
  return <Select values={currentRegion ? [regions[currentRegion - 1]] : []} onChange={handleChange} placeholder="Choisir une région" labelField="nom" valueField="id" options={options} searchable={false} />
}

export default RegionSelect