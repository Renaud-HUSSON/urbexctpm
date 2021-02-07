import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { LoggedContext } from "../../context/Logged"
import RequireLogin from "../RequireLogin"

const withAuth = (Component, options={}) => {
  const Auth = (props) => {
    const [logged, ] = useContext(LoggedContext)
    const router = useRouter()
  
    if(logged){
      return <Component {...props}/>
    }
    
    useEffect(() => {
      if(options.redirect && logged === false){
        router.push(options.redirect)
        return <div></div>
      }
    }, [])

    if(!options.redirect){
      return <RequireLogin />
    }

    return <></>
  }

  return Auth
}

export default withAuth