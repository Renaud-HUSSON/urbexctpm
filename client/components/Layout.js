import Head from 'next/head'
import Header from "./Header/Header"

const Layout = ({children}) => {
  return <>
    <Head>
      <title>urbexctpm</title>
    </Head>
    <Header />
    {children}
  </>
}

export default Layout