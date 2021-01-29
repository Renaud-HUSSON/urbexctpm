import { Datagrid, DateField, List, TextField } from "react-admin";

const CategoriesList = props => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="titre" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
      </Datagrid>
  </List>
);

export default CategoriesList