import { Filter, ReferenceInput, SelectInput } from "react-admin"

const ImagesFilter = (props) => {
  return <Filter {...props}>
    <ReferenceInput label="Catégorie" source="categorieId" reference="categories" allowEmpty={false}>
      <SelectInput source="categorie" optionText="titre" />
    </ReferenceInput>
    <ReferenceInput  source="locationId" reference="locations" allowEmpty={false}>
      <SelectInput optionText="title"/>
    </ReferenceInput>
  </Filter>
}

export default ImagesFilter