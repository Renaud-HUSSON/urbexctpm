import { Route, Switch } from "react-router-dom"
import Gallerie from "../pages/Gallerie"
import Home from "../pages/Home"

const Router = () => {
  return <Switch>
    <Route path="/" component={Home} exact/>
    <Route path="/gallerie" component={Gallerie} exact/>
  </Switch>
}

export default Router