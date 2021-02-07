import Header from "../components/Header/Header";
import Layout from "../components/Layout"
import { LoggedProvider } from "../context/Logged";
import "../styles/index.scss"

function App({Component, pageProps}) {
  return (
    <Layout>
      <LoggedProvider>
        <Component {...pageProps} />
      </LoggedProvider>
    </Layout>
  );
}

export default App;
