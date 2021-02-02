import { Datagrid, DateField, EditButton, List, SimpleList, TextField } from "react-admin"
import { useMediaQuery } from '@material-ui/core';


const LocationList = (props) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  return <List {...props}>
  {
    isSmall
    ?<SimpleList
        primaryText={record => record.titre}
        secondaryText={record => `${record.lat} ${record.lgt}`}
        tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
      />
    :<Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" label="Titre"/>
      <TextField source="lat" label="Latitude"/>
      <TextField source="lng" label="Longitude"/>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
  </Datagrid>
  }
</List>
}

export default LocationList