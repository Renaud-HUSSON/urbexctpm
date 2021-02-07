import { useContext } from "react"
import { LoggedContext } from "../../context/Logged"
import RequireLogin from "../RequireLogin"

const withAuth = Component => {
  const Auth = (props) => {
    const [logged, ] = useContext(LoggedContext)
  
    if(logged){
      return <Component {...props}/>
    }
  
    return <RequireLogin />
  }

  return Auth
}

export default withAuth