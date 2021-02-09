import { useEffect } from "react";
import Header from "../components/Header/Header";
import Layout from "../components/Layout"
import { FlashProvider } from "../context/Flash";
import { LoggedProvider } from "../context/Logged";
import sitemap from "../sitemap";
import "../styles/index.scss"

function App({Component, pageProps}) {
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

export async function getStaticProps(){
  sitemap()
  window.setInterval(sitemap, 1000 * 60 * 60 * 24)

  return {
    props: {}
  }
}

export default App;
