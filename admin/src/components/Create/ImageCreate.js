import { Create, ImageField, ImageInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

const ImageCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <TextInput label="Titre" source="titre"  validate={[required()]} resettable/>
      <ReferenceInput label="Catégorie" source="categorie" reference="categories" allowEmpty>
        <SelectInput source="categorie" optionText="titre" emptyText="Aucune catégorie"/>
      </ReferenceInput>
      <ImageInput label="Image" source="image" validate={[required()]} accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput label="Description" source="description" resettable/>
    </SimpleForm>
  </Create>
}

export default ImageCreate