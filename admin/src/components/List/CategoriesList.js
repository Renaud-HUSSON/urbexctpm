import { Datagrid, DateField, List, SimpleList, TextField } from "react-admin";
import { useMediaQuery } from '@material-ui/core';

const CategoriesList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  return <List {...props}>
    {
      isSmall
      ?<SimpleList
          primaryText={record => record.titre}
          secondaryText={record => `${record.description} views`}
          tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
        />
      :<Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="titre" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
    </Datagrid>
    }
  </List>
}

export default CategoriesList