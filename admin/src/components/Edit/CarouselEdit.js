import { DateInput, Edit, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

const CarouselEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput label="id" source="id" disabled/>
      <ReferenceInput label="image" source="imageId" reference="images" validate={[required()]} allowEmpty={false}>
        <SelectInput optionText="titre"/>
      </ReferenceInput>
      <DateInput source="createdAt" disabled/>
      <DateInput source="updatedAt" disabled/>
    </SimpleForm>
  </Edit>
}

export default CarouselEdit