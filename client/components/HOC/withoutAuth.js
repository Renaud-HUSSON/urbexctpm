import { useContext } from "react"
import { LoggedContext } from "../../context/Logged"
import { useRouter } from "next/router"

const withoutAuth = Component => {
  const Auth = (props) => {
    const [logged, ] = useContext(LoggedContext)
    const router = useRouter()
  
    if(logged.logged === true){
      router.push('/')
      return <></>
    }else if(logged.logged === false){
      return <Component {...props}/>
    }

    return <></>
  }

  return Auth
}

export default withoutAuth