const { Edit, TextInput, SimpleForm, DateInput, ReferenceInput, SelectInput } = require("react-admin")

const LocationEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled/>
      <TextInput source="title" label="Titre"/>
      <ReferenceInput perPage="100000" source="regionId" reference="regions">
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <TextInput style={{width: '100%'}} rows={10} source="description" multiline/>
      <DateInput source="createdAt" disabled/>
      <DateInput source="updatedAt" disabled/>
    </SimpleForm>
  </Edit>
}

export default LocationEdit