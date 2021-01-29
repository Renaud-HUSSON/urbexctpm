import { DateInput, Edit, required, SimpleForm, TextInput } from "react-admin"

const CategoriesEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="id" source="id"/>
      <TextInput label="Titre" source="titre" resettable validate={required()}/>
      <DateInput disabled label="Date de publication" source="createdAt"/>
      <DateInput disabled label="Dernière modification" source="updatedAt"/>
    </SimpleForm>
  </Edit>
}

export default CategoriesEdit