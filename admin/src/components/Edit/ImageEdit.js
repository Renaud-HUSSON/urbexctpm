import { DateInput, Edit, ImageField, ImageInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

const ImagesEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="id" source="id"/>
      <TextInput label="Titre" source="titre" validate={[required()]} resettable/>
      <ReferenceInput perPage="100000" label="Catégorie" source="categorieId" reference="categories" allowEmpty>
        <SelectInput optionText="titre" emptyText="Aucune catégorie"/>
      </ReferenceInput>
      <ReferenceInput perPage="100000" label="Lieu" source="locationId" reference="locations" allowEmpty>
        <SelectInput optionText="title" emptyText="Aucun lieu"/>
      </ReferenceInput>
      <ImageField label="Ancienne image" source="chemin" title="titre" />
      <ImageInput label="Image" source="image" accept="image/*">
        <ImageField source="chemin" title="titre" />
      </ImageInput>
      <TextInput label="Description" style={{width: '100%'}} rows={10} source="description" multiline resettable/>
      <DateInput disabled label="Date de publication" source="createdAt"/>
      <DateInput disabled label="Dernière modification" source="updatedAt"/>
    </SimpleForm>
  </Edit>
}

export default ImagesEdit