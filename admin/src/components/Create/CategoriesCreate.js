import { Create, SimpleForm, TextInput } from "react-admin"

const CategoriesCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <TextInput label="Titre" source="titre" resettable/>
    </SimpleForm>
  </Create>
}

export default CategoriesCreate