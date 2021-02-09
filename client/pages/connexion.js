import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Ga from "../components/Ga"
import withoutAuth from "../components/HOC/withoutAuth"
import FlashMessage from "../components/shared/FlashMessage"
import { LoggedContext } from "../context/Logged"

const Connexion = () => {
  const { register, errors, handleSubmit } = useForm()
  const router = useRouter()
  const [, setLogged] = useContext(LoggedContext)
  const [flash, setFlash] = useState({active: false, success: undefined, message: undefined})

  const onSubmit = async datas => {
    const data = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(res => res.json())

    setFlash({active: true, success: data.success, message: data.message})

    if(data.success){
      setLogged({logged: true, data: data.data})
      router.push('/profil')
    }
  }
  
  return <Ga>
    {
      flash.active
      ?<FlashMessage success={flash.success} message={flash.message} duration={5000} setFlash={setFlash} stateContent={{active: false, success: undefined, message: undefined}}>
        <p>{flash.message}</p>
      </FlashMessage>
      :<></>
    }
    <section className="login-page">
      <Head>
        <title>Se connecter - urbexctpm</title>
        <meta name="description" content="Connectez vous et accédez à certaines pages tel que les lieux et la carte"/>

        <meta property="og:url" content="https:/urbexctpm.fr/connexion" />
        <meta property="og:title" content="Se connecter - urbexctpm" />
        <meta property="og:description" content="Connectez vous et accédez à certaines pages tel que les lieux et la carte" />
        <meta property="twitter:url" content="https:/urbexctpm.fr/carte" />
        <meta property="twitter:title" content="Se connecter - urbexctpm" />
        <meta property="twitter:description" content="Connectez vous et accédez à certaines pages tel que les lieux et la connexion" />
      </Head>
    
      <h1>Connectez vous</h1>
      <p className="login-page__choice">ou bien <Link href="/inscription"><a>créez un compte</a></Link></p>
      <p>Et accédez à certaines pages tel que les lieux et la carte</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="log-email">Adresse email</label>
          <input type="email" id="log-email" name="email" ref={register({ required: true })}/><br/>
          {errors.email && <p className="input-group__error">Vous devez rentrer un email</p>}
        </div>
        <div className="input-group">
          <label htmlFor="log-password">Mot de passe</label>
          <input type="password" id="log-password" name="password" ref={register({ required: true })}/><br/>
          {errors.password && <p className="input-group__error">Vous devez rentrer un mot de passe</p>}
        </div>
        <div className="input-group checkbox">
          <input type="checkbox" name="refresh" id="log-refresh" ref={register()}/>
          <label htmlFor="log-refresh">Mémoriser mon mot de passe</label>
        </div>
        <button className="button" type="submit">Valider</button>
      </form>
    </section>
  </Ga> 
}

export default withoutAuth(Connexion)