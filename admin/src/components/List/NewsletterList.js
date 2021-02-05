import { Datagrid, EmailField, List, TextField } from "react-admin"
import SendMail from "../SendMail"

const NewsletterList = (props) => {
  return <>
    <SendMail />
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <EmailField source="email" />
      </Datagrid>
    </List>
  </> 
}

export default NewsletterList