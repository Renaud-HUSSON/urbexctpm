const { Create, SimpleForm, TextInput } = require("react-admin")

const LocationCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Titre"/>
      <TextInput source="lat" label="Latitude"/>
      <TextInput source="lng" label="Longitude"/>
    </SimpleForm>
  </Create>
}

export default LocationCreate