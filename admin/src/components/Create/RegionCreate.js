const { Create, SimpleForm, required, TextInput } = require("react-admin")

const RegionCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <TextInput source="nom" validate={required()}/>
    </SimpleForm>
  </Create>
}

export default RegionCreate