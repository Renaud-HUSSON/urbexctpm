import { Admin, ListGuesser, Resource } from 'react-admin'
import dataProvider from './config/dataProvider';
import CategoriesList from './components/List/CategoriesList'
import authProvider from './config/authProvider';
import CategoriesCreate from './components/Create/CategoriesCreate';
import CategoriesEdit from './components/Edit/CategoriesEdit';

function App() {
  return (
    <Admin title="TEST" authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="categories" list={CategoriesList} create={CategoriesCreate} edit={CategoriesEdit}/>
    </Admin>
  );
}

export default App;
