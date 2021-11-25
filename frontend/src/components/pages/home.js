import {Component} from "react";

class Home extends Component{

    state={
        user:{
            name:"",
            steamId:"",
            level:""
        }
    }

    componentDidMount() {
        this.fetchUserData()
    }

    fetchUserData() {
        fetch('http://127.0.0.1:8000/user/me/',{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {return response.json()})
            .then(
                result => this.setState({user:{steamId:result.steamId}})
            );
    }

    render(){
        return (
            <div className='home'>
                <h1>{this.state.user.steamId}</h1>
            </div>
        );
    }
}

export default Home