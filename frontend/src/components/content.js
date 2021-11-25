import {Route, Switch} from "react-router-dom";

import Home from "./pages/home"
import Profile from "./pages/profile"
import Shop from "./pages/shop"
import {Component} from "react";

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/profile' render={()=><Profile user={this.props.user}/>}/>
                <Route exact path='/shop' component={Shop}/>
            </Switch>
        );
    }
}

export default Main