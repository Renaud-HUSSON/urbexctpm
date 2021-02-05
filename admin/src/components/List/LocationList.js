import { Datagrid, EditButton, List, ReferenceField, SimpleList, TextField } from "react-admin"
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
      <ReferenceField source="regionId" reference="regions">
        <TextField source="nom" label="Region"/>
      </ReferenceField>
      <TextField source="description" label="Description"/>
      <EditButton />
  </Datagrid>
  }
</List>
}

export default LocationList