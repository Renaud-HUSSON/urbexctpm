const { Edit, SimpleForm, TextInput, required, DateInput } = require("react-admin")

const RegionEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="nom" validate={required()}/>
      <DateInput source="createdAt" disabled/>
      <DateInput source="updatedAt" disabled/>
    </SimpleForm>
  </Edit>
}

export default RegionEdit