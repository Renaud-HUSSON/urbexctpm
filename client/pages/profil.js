import { useContext } from "react"
import withAuth from "../components/HOC/withAuth"
import { LoggedContext } from "../context/Logged"
import useGetData from '../hooks/useGetData'
import Loading from '../components/shared/Loading'
import { useForm } from "react-hook-form"
import Ga from "../components/Ga"
import { useRouter } from "next/router"

const Profile = () => {
  const router = useRouter()
  const [logged, setLogged] = useContext(LoggedContext)
  const { register, errors, handleSubmit, formState, getValues } = useForm()

  const profil = useGetData(`/api/users/${logged.data.sub}`)

  //If formState.dirtyFields isn't used before submitting, dirtyFields is wrong
  const fixBug = formState.dirtyFields
  
  const onSubmit = values => {
    const data = {}
    
    for(let value in values){
      if(Object.keys(formState.dirtyFields).includes(value)){
        data[value] = values[value]
      }
    }

    fetch(`/api/users/${profil.data.data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'})
    })
  }
  
  const handleClick = async () => {
    const data = await fetch(`/api/users?id=${logged.data.sub}`, {
      method: 'DELETE'
    })

    const json = await data.json()

    try {
      await fetch('/api/auth/logout')
    }catch(e){}

    setLogged({logged: false, data: ''})
    router.push('/')
  }

  return <Ga>
    {
      !profil.loading
    ?<section className="profil">
      <h1>Bonjour, {profil.data.data.username}</h1>
      <h2>Modifier mes informations</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="username">Prénom / Nom</label>
          <input defaultValue={profil.data.data.username} type="text" name="username" id="username" ref={register({ required: true })}/>
          {errors.username && <p className="input-group__error">Le champ ne peut pas être vide</p>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input defaultValue={profil.data.data.email} type="email" name="email" id="email" ref={register({ required: true })}/>
          {errors.email && <p className="input-group__error">Le champ ne peut pas être vide</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Mot de passe</label>
          <input defaultValue={profil.data.data.password} type="password" name="password" id="password" ref={register({ required: true, validate: value => value === getValues("confirm_password") })}/>
          {errors.password && <p className="input-group__error">Les 2 mots de passe doivent correspondre</p>}
        </div>
        <div className="input-group">
          <label htmlFor="confirm_password">Confirmer le mot de passe</label>
          <input defaultValue={profil.data.data.password} type="password" name="confirm_password" id="confirm_password" ref={register({ required: true, validate: value => value === getValues("password") })}/>
          {errors.confirm_password && <p className="input-group__error">Les 2 mots de passe doivent correspondre</p>}
        </div>
        <button disabled={formState.isSubmitting ? true : false} className="button" type="submit">Modifier</button>
      </form>
      <button onClick={handleClick} className="button button--danger">Supprimer mon compte</button>
    </section>
    :<Loading />
    }
  </Ga>
}

export default withAuth(Profile)