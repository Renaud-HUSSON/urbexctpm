import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import Ga from "../components/Ga"
import withoutAuth from "../components/HOC/withoutAuth"
import FlashMessage from "../components/shared/FlashMessage"
import { LoggedContext } from "../context/Logged"

const Inscription = () => {
  const { register, errors, handleSubmit } = useForm()
  const [, setLogged] = useContext(LoggedContext)
  const [flash, setFlash] = useState({active: false, success: undefined, message: undefined})

  const router = useRouter()

  const onSubmit = async datas => {
    const data = await fetch('/api/auth/register', {
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
    <section className="login-page">
      {
        flash.active
        ?<FlashMessage success={flash.success} message={flash.message} duration={5000} setFlash={setFlash} stateContent={{active: false, success: undefined, message: undefined}}>
          <p>{flash.message}</p>
        </FlashMessage>
        :<></>
      }
    
      <Head>
        <title>S'inscrire - urbexctpm</title>
        <meta name="description" content="Crééz un compte et gagnez la possibilité d'accéder à certaines pages tel que les lieux et la carte"/>

        <meta property="og:url" content="https:/urbexctpm.fr/inscription" />
        <meta property="og:title" content="S'inscrire - urbexctpm" />
        <meta property="og:description" content="Crééz un compte et gagnez la possibilité d'accéder à certaines pages tel que les lieux et la carte" />
        <meta property="twitter:url" content="https:/urbexctpm.fr/inscription" />
        <meta property="twitter:title" content="S'inscrire - urbexctpm" />
        <meta property="twitter:description" content="Crééz un compte et gagnez la possibilité d'accéder à certaines pages tel que les lieux et la carte" />
      </Head>
    
      <h1>Créez un compte</h1>
      <p>et gagnez la possibilité d'accéder à certaines pages tel que les lieux et la carte</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="reg-username">Prénom / Nom</label>
          <input type="text" id="reg-username" name="username" ref={register({ required: true })}/><br/>
          {errors.username && <p className="input-group__error">Vous devez rentrer un nom / prénom</p>}
        </div>
        <div className="input-group">
          <label htmlFor="reg-email">Adresse email</label>
          <input type="email" id="reg-email" name="email" ref={register({ required: true })}/><br/>
          {errors.email && <p className="input-group__error">Vous devez rentrer un email</p>}
        </div>
        <div className="input-group">
          <label htmlFor="reg-password">Mot de passe</label>
          <input type="password" id="reg-password" name="password" ref={register({ required: true })}/><br/>
          {errors.password && <p className="input-group__error">Vous devez rentrer un mot de passe</p>}
        </div>
        <div className="input-group checkbox">
          <input type="checkbox" name="refresh" id="reg-refresh" ref={register()}/>
          <label htmlFor="reg-refresh">Mémoriser mon mot de passe</label>
        </div>
        <div className="input-group checkbox">
          <input type="checkbox" name="newsletter" id="reg-newsletter" ref={register()}/>
          <label htmlFor="reg-newsletter">S'inscrire à la newsletter</label>
        </div>
        <button className="button" type="submit">Valider</button>
      </form>
    </section>
  </Ga> 
}

export default withoutAuth(Inscription)