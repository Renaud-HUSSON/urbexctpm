import { Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

const CarouselCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <ReferenceInput perPage="100000" label="image" source="imageId" reference="images" validate={[required()]} allowEmpty={false}>
        <SelectInput optionText="titre" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
}

export default CarouselCreate