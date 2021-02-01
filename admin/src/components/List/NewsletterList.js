import { Datagrid, DateField, EmailField, List, TextField } from "react-admin"
import SendMail from "../SendMail"

const NewsletterList = (props) => {
  return <>
    <SendMail />
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <EmailField source="email" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  </> 
}

export default NewsletterList