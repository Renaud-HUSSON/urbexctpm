import { DateInput, Edit, ImageField, ImageInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

const ImagesEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="id" source="id"/>
      <TextInput label="Titre" source="titre"  validate={[required()]} resettable/>
      <ReferenceInput label="Catégorie" source="categorieId" reference="categories" allowEmpty>
        <SelectInput optionText="titre" emptyText="Aucune catégorie"/>
      </ReferenceInput>
      <ReferenceInput label="Lieu" source="locationId" reference="locations" allowEmpty>
        <SelectInput optionText="title" emptyText="Aucun lieu"/>
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