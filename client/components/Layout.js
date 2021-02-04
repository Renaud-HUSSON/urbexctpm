import Head from 'next/head'
import Footer from './Footer/Footer'
import Header from "./Header/Header"

const Layout = ({children}) => {
  return <>
    <Head>
      <title>urbexctpm</title>
    </Head>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </>
}

export default Layout