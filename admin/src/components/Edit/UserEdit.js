import { DateInput, Edit, PasswordInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin"

const UserEdit = (props) => {
  return <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled/>
      <TextInput source="username" disabled/>
      <TextInput source="email" disabled/>
      <TextInput source="roleId" disabled/>
      <ReferenceInput source="roleId" reference="roles">
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <PasswordInput source="password" disabled/>
      <DateInput source="createdAt" disabled/>
      <DateInput source="updatedAt" disabled/>
    </SimpleForm>
  </Edit>
}

export default UserEdit