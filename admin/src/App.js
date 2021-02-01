import { Admin, ListGuesser, Resource } from 'react-admin'
import dataProvider from './config/dataProvider';
import ImagesList from './components/List/ImagesList';
import CategoriesList from './components/List/CategoriesList'
import authProvider from './config/authProvider';
import CategoriesCreate from './components/Create/CategoriesCreate';
import CategoriesEdit from './components/Edit/CategoriesEdit';
import ImageCreate from './components/Create/ImageCreate';
import ImagesEdit from './components/Edit/ImageEdit';
import UsersList from './components/List/UsersList';
import PhotoIcon from '@material-ui/icons/Photo';
import UserIcon from '@material-ui/icons/Group';
import RoleIcon from '@material-ui/icons/SupervisedUserCircle';
import UserEdit from './components/Edit/UserEdit';
import RolesList from './components/List/RolesList';
import CustomLayout from './components/Custom/CustomLayout';
import NewsletterCreate from './components/Create/NewsletterCreate';

function App() {
  return (
    <Admin title="TEST" layout={CustomLayout} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="images" list={ImagesList} create={ImageCreate} edit={ImagesEdit} icon={PhotoIcon}/>
      <Resource name="categories" options={{label: "Catégories"}} list={CategoriesList} create={CategoriesCreate} edit={CategoriesEdit}/>
      <Resource name="users" options={{label: "Utilisateurs"}} list={UsersList} edit={UserEdit} icon={UserIcon}/>
      <Resource name="roles" list={RolesList} icon={RoleIcon} />
      <Resource name="newsletter" list={ListGuesser} create={NewsletterCreate}/>
    </Admin>
  );
}

export default App;
