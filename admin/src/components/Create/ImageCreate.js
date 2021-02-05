import { Create, ImageField, ImageInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

const ImageCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <TextInput label="Titre" source="titre"  validate={[required()]} resettable/>
      <ReferenceInput label="Catégorie" source="categorieId" reference="categories" allowEmpty>
        <SelectInput source="categorie" optionText="titre" emptyText="Aucune catégorie"/>
      </ReferenceInput>
      <ReferenceInput label="Lieu" source="locationId" reference="locations" allowEmpty>
        <SelectInput optionText="title" emptyText="Aucun lieu"/>
      </ReferenceInput>
      <ImageInput label="Image" source="image" validate={[required()]} accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput label="Description" style={{width: '100%'}} rows={10} source="description" multiline resettable/>
    </SimpleForm>
  </Create>
}

export default ImageCreate