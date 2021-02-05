import { Datagrid, EditButton, List, SimpleList, TextField } from "react-admin";
import { useMediaQuery } from '@material-ui/core';

const CategoriesList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  return <List {...props}>
    {
      isSmall
      ?<SimpleList
          primaryText={record => record.titre}
          tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
        />
      :<Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="titre" />
        <EditButton />
    </Datagrid>
    }
  </List>
}

export default CategoriesList