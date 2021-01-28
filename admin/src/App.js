import { Admin } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest';

function App() {
  return (
    <Admin title="Hey" dataProvider={simpleRestProvider('/api')}>
    </Admin>
  );
}

export default App;
