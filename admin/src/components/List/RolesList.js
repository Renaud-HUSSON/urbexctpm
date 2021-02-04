import { Datagrid, DateField, List, SimpleList, TextField } from "react-admin"
import { useMediaQuery } from '@material-ui/core';

const RolesList = (props) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  return <List {...props} bulkActionButtons={false}>
    {
      isSmall
      ?<SimpleList
          primaryText={record => record.nom}
          tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
        />
      :<Datagrid>
        <TextField source="id" />
        <TextField source="nom" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    }
</List>
}

export default RolesList