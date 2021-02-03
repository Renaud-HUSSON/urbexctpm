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
import EmailIcon from '@material-ui/icons/Email';
import NewsletterList from './components/List/NewsletterList';
import LoginPage from './components/Custom/LoginPage';
import LocationIcon from '@material-ui/icons/Room';
import LocationCreate from './components/Create/LocationCreate';
import LocationEdit from './components/Edit/LocationEdit';
import LocationList from './components/List/LocationList';
import CarouselIcon from '@material-ui/icons/ViewCarousel';
import CarouselCreate from './components/Create/CarouselCreate';
import CarouselEdit from './components/Edit/CarouselEdit';
import CarouselList from './components/List/CarouselList';

function App() {
  return (
    <Admin loginPage={LoginPage} layout={CustomLayout} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="images" list={ImagesList} create={ImageCreate} edit={ImagesEdit} icon={PhotoIcon}/>
      <Resource name="categories" options={{label: "Catégories"}} list={CategoriesList} create={CategoriesCreate} edit={CategoriesEdit}/>
      <Resource name="locations" options={{label: "Lieux"}} list={LocationList} create={LocationCreate} edit={LocationEdit} icon={LocationIcon}/>
      <Resource name="newsletter" list={NewsletterList} create={NewsletterCreate} icon={EmailIcon}/>
      <Resource name="users" options={{label: "Utilisateurs"}} list={UsersList} edit={UserEdit} icon={UserIcon}/>
      <Resource name="roles" list={RolesList} icon={RoleIcon} />
      <Resource name="carousel" options={{label: "Carousel"}} list={CarouselList} create={CarouselCreate} edit={CarouselEdit} icon={CarouselIcon}/>
    </Admin>
  );
}

export default App;
