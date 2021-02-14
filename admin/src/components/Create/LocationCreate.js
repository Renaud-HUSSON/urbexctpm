import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from "react-admin"

const LocationCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Titre"/>
      <ReferenceInput perPage="100000" source="regionId" reference="regions">
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <TextInput style={{width: '100%'}} rows={10} source="description" multiline/>
    </SimpleForm>
  </Create>
}

export default LocationCreate