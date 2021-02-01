import { Datagrid, DateField, EmailField, List, TextField } from "react-admin"

const NewsletterList = (props) => {
  return <List {...props}>
  <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
  </Datagrid>
</List>
}

export default NewsletterList