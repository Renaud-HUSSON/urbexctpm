import Layout from "../components/Layout";
import { FlashProvider } from "../context/Flash";
import { LoggedProvider } from "../context/Logged";
import "../styles/index.scss";

function App({ Component, pageProps }) {
  return (
    <LoggedProvider>
      <FlashProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FlashProvider>
    </LoggedProvider>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default App;
