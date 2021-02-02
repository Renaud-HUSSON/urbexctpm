const { Edit, TextInput, SimpleForm, DateInput } = require("react-admin")

const LocationEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled/>
      <TextInput source="title" label="Titre"/>
      <TextInput source="lat" label="Latitude"/>
      <TextInput source="lng" label="Longitude"/>
      <DateInput source="createdAt" disabled/>
      <DateInput source="updatedAt" disabled/>
    </SimpleForm>
  </Edit>
}

export default LocationEdit