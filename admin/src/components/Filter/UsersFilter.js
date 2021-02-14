import { Filter, ReferenceInput, SelectInput } from "react-admin"

const UsersFilter = (props) => {
  return <Filter {...props}>
    <ReferenceInput perPage="100000" source="roleId" reference="roles" allowEmpty={false}>
      <SelectInput optionText="nom" />
    </ReferenceInput>
  </Filter>
}

export default UsersFilter