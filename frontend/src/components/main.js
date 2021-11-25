import {Route, Switch} from "react-router-dom";

import Home from "./pages/home"
import Profile from "./pages/profile"
import Navigation from "./navigation"
import WebInventory from "./pages/webinventory"

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/webinventory' component={WebInventory}/>
    </Switch>
);

export default Main