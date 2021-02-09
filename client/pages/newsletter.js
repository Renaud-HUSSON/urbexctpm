import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Ga from "../components/Ga";
import FlashMessage from "../components/shared/FlashMessage";

const Newsletter = () => {
  const [flash, setFlash] = useState({active: false, success: undefined, message: undefined})
  const { register, errors, handleSubmit, reset } = useForm()

  const onSubmit = async datas => {
    const data = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    
    const json = await data.json()

    if(json.success){
      reset()
    }

    setFlash({active: true, success: json.success, message: json.message})
  }
  
  return <Ga>
    <section className="newsletter-page">
      <Head>
        <title>Newsletter - urbexctpm</title>
        <meta name="description" content="Inscrivez vous à notre newsletter et recevez des emails lorsque de nouvelles images sont disponnibles"/>

        <meta property="og:url" content="https:/urbexctpm.fr/newsletter" />
        <meta property="og:title" content="Newsletter - urbexctpm" />
        <meta property="og:description" content="Inscrivez vous à notre newsletter et recevez des emails lorsque de nouvelles images sont disponnibles" />
        <meta property="twitter:url" content="https:/urbexctpm.fr/newsletter" />
        <meta property="twitter:title" content="Newsletter - urbexctpm" />
        <meta property="twitter:description" content="Inscrivez vous à notre newsletter et recevez des emails lorsque de nouvelles images sont disponnibles" />
      </Head>

      {
        flash.active
        ?<FlashMessage success={flash.success} message={flash.message} duration={5000} setFlash={setFlash} stateContent={{active: false, success: undefined, message: undefined}}>
          <p>{flash.message}</p>
        </FlashMessage>
        :<></>
      }
      
      <div className="left">
        <h1>Inscrivez vous à notre newsletter</h1>
        <p>Recevez des emails lorsque de nouvelles images sont disponnibles</p>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>S'inscrire</h2>
          <div className="input-group">
            <label htmlFor="sub-email">Adresse email</label>
            <input type="email" id="sub-email" name="email" ref={register({ required: true })}/><br/>
            {errors.email && <p className="input-group__error">Vous devez rentrer un email</p>}
          </div>
          <button className="button" type="submit">Valider</button>
        </form>
      </div>
    </section>
  </Ga> 
}

export default Newsletter