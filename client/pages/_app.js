import Header from "../components/Header/Header";
import Layout from "../components/Layout"
import { LoggedProvider } from "../context/Logged";
import "../styles/index.scss"

function App({Component, pageProps}) {
  return (
    <LoggedProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoggedProvider>
  );
}

export default App;
