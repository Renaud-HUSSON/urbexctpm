import { Filter, ReferenceInput, SelectInput } from "react-admin"

const ImagesFilter = (props) => {
  return <Filter {...props}>
    <ReferenceInput perPage="100000" label="Catégorie" source="categorieId" reference="categories" allowEmpty={false}>
      <SelectInput source="categorie" optionText="titre" />
    </ReferenceInput>
    <ReferenceInput perPage="100000" source="locationId" reference="locations" allowEmpty={false}>
      <SelectInput optionText="title"/>
    </ReferenceInput>
  </Filter>
}

export default ImagesFilter