import { Datagrid, EditButton, List, ReferenceField, SimpleList, TextField } from "react-admin";
import { useMediaQuery } from '@material-ui/core';
import ImagesFilter from "../Filter/ImagesFilter";

const ImagesList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  return <List filters={<ImagesFilter />} {...props}>
    {
      isSmall
      ?<SimpleList
          primaryText={record => record.titre}
          secondaryText={record => `${record.description}`}
          tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
        />
      :<Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="titre"/>
          <ReferenceField source="categorieId" reference="categories">
            <TextField source="titre" label="Catégorie" sortable={false}/>
          </ReferenceField>
          <ReferenceField source="locationId" reference="locations">
            <TextField source="title" label="Lieu" sortable={false}/>
          </ReferenceField>
          <TextField source="chemin" />
          <TextField source="description" />
          <EditButton />
      </Datagrid>
    }
  </List>
}

export default ImagesList