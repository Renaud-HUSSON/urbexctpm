import { Datagrid, DateField, EmailField, List, SimpleList, TextField } from "react-admin"
import { useMediaQuery } from '@material-ui/core';

const UsersList = (props) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  return <List {...props}>
      {
        isSmall
        ?<SimpleList
          primaryText={record => record.username}
          secondaryText={record => `${record.email} views`}
          tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
        />
        :<Datagrid>
          <TextField source="id" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="password" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      }
  </List>
}

export default UsersList