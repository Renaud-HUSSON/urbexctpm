import { Route, Switch } from "react-router-dom"
import Gallerie from "../pages/Gallerie"
import Home from "../pages/Home"
import ImageDetails from "../pages/ImageDetails"

const Router = () => {
  return <Switch>
    <Route path="/" component={Home} exact/>
    <Route path="/gallerie" component={Gallerie} exact/>
    <Route path="/gallerie/:id" component={ImageDetails} exact/>
  </Switch>
}

export default Router