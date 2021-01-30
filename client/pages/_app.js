import Header from "../components/Header/Header";
import Layout from "../components/Layout"
import "../styles/index.scss"

function App({Component, pageProps}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
