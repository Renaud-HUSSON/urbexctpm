import { Datagrid, List, TextField } from "react-admin"

const RegionsList = (props) => {
  return <List {...props}>
    <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="nom" />
    </Datagrid>
  </List>
}

export default RegionsList