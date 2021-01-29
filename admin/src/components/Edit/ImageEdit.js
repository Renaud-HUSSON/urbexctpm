import { DateInput, Edit, ImageField, ImageInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

const ImagesEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="id" source="id"/>
      <TextInput label="Titre" source="titre"  validate={[required()]} resettable/>
      <ReferenceInput label="Catégorie" source="categorie" reference="categories" allowEmpty>
        <SelectInput source="categorie" optionText="titre" emptyText="Aucune catégorie"/>
      </ReferenceInput>
      <ImageField label="Ancienne image" source="chemin" title="titre" />
      <ImageInput label="Image" source="image" accept="image/*">
        <ImageField source="chemin" title="titre" />
      </ImageInput>
      <TextInput label="Description" source="description" resettable/>
      <DateInput disabled label="Date de publication" source="createdAt"/>
      <DateInput disabled label="Dernière modification" source="updatedAt"/>
    </SimpleForm>
  </Edit>
}

export default ImagesEdit