import { useCallback } from "react"
import Select from "react-dropdown-select";

const CategorySelect = ({setCategory, categories}) => {
  const handleChange = useCallback(e => {
    setCategory(e[0].id)
  }, [])
  
  const options = [
    {id: '', titre: 'Toutes les catégories'},
    ...categories.map(category => {
      return {
        id: category.id,
        titre: category.titre
      }
    })
  ]
  
  return  <Select placeholder="Choisir une catégorie" style={{padding: '0.75rem'}} searchable={false} labelField="titre" valueField="id" options={options} onChange={handleChange} />
}

export default CategorySelect