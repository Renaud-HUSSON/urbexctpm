import { Admin, ListGuesser, Resource } from 'react-admin'
import dataProvider from './config/dataProvider';
import ImagesList from './components/List/ImagesList';
import CategoriesList from './components/List/CategoriesList'
import authProvider from './config/authProvider';
import CategoriesCreate from './components/Create/CategoriesCreate';
import CategoriesEdit from './components/Edit/CategoriesEdit';
import ImageCreate from './components/Create/ImageCreate';
import ImagesEdit from './components/Edit/ImageEdit';
import PhotoIcon from '@material-ui/icons/Photo';

function App() {
  return (
    <Admin title="TEST" authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="images" list={ImagesList} create={ImageCreate} edit={ImagesEdit} icon={PhotoIcon}/>
      <Resource name="categories" options={{label: "Catégories"}} list={CategoriesList} create={CategoriesCreate} edit={CategoriesEdit}/>
    </Admin>
  );
}

export default App;
