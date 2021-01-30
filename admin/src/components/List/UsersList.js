import { Datagrid, DateField, EditButton, EmailField, List, SimpleList, TextField } from "react-admin"
import { useMediaQuery } from '@material-ui/core';
import UsersFilter from "../Filter/UsersFilter";

const UsersList = (props) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  return <List filters={<UsersFilter />} {...props}>
      {
        isSmall
        ?<SimpleList
          primaryText={record => record.username}
          secondaryText={record => `${record.email}`}
          tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
        />
        :<Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="role.nom" label="Role" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <EditButton />
        </Datagrid>
      }
  </List>
}

export default UsersList