import { Route, Switch } from "react-router-dom"
import Home from "../pages/Home"

const Router = () => {
  return <Switch>
    <Route path="/" component={Home} exact/>
  </Switch>
}

export default Router