import { Datagrid, DateField, List, ReferenceField, TextField } from "react-admin"

const CarouselList = (props) => {
  return <List {...props}>
    <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="imageId" reference="images">
          <TextField source="titre"/>
        </ReferenceField>
        <DateField source="updatedAt" />
        <DateField source="createdAt" />
    </Datagrid>
  </List>
}

export default CarouselList