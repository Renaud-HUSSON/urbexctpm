import { useRouter } from "next/router"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import withoutAuth from "../components/HOC/withoutAuth"
import { LoggedContext } from "../context/Logged"

const Connexion = () => {
  const { register, errors, handleSubmit } = useForm()
  const router = useRouter()
  const [, setLogged] = useContext(LoggedContext)

  const onSubmit = async datas => {
    const data = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(res => res.json())

    if(data.success){
      console.log(data)
      
      setLogged({logged: true, data: data.data})
      router.push('/profil')
    }
  }
  
  return <section className="login-page">
  <h1>Connectez vous</h1>
  <p>et accédez à certaines pages tel que les lieux et la carte</p>
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
}

export default withoutAuth(Connexion)