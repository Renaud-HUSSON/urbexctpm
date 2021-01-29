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

function App() {
  return (
    <Admin title="TEST" authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="images" list={ImagesList} create={ImageCreate} edit={ImagesEdit} icon={PhotoIcon}/>
      <Resource name="categories" options={{label: "Catégories"}} list={CategoriesList} create={CategoriesCreate} edit={CategoriesEdit}/>
      <Resource name="users" options={{label: "Utilisateurs"}} list={UsersList} icon={UserIcon}/>
    </Admin>
  );
}

export default App;
