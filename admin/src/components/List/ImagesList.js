import { Datagrid, DateField, List, NumberField, SimpleList, TextField } from "react-admin";
import { useMediaQuery } from '@material-ui/core';

const ImagesList = props => {
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
          <TextField source="chemin" />
          <TextField source="description" />
          <NumberField source="categorie" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
      </Datagrid>
    }
  </List>
}

export default ImagesList