import { Create, SimpleForm, TextInput } from "react-admin"

const NewsletterCreate = (props) => {
  return <Create {...props}>
    <SimpleForm>
      <TextInput source="email"/>
    </SimpleForm>
  </Create>
}

export default NewsletterCreate