import './App.css';
import Authenticate from 'react-openidconnect';
import OidcSettings from './oidcsettings';
import Header from './components/header';
import Content from "./components/content"
import Footer from "./components/footer"
import RightSide from "./components/rightSide"
import Navigation from "./components/navigation"
import {Component} from "react";
import ShopScript from "./scripts/shopScript";
import StandardProfilePic from "./image/default-profile.jpg"
import React from 'react';
import Cookies from 'js-cookie';
import Deposit from "./components/popup/deposit/deposit";

function Withdraw() {
    return null;
}

class App extends Component {

    state = {
        deposit: "none",
        loggedIn: false,
        user: {
            name: "Login",
            steamId: "0",
            level: "0",
            profilePic: StandardProfilePic
        },
        inventory: [],
        inventoryItemsSelected: [],
    }

    componentDidMount() {
        this.isLoggedIn()

    }
    isLoggedIn() {
        fetch('https://104.194.242.202:8000/user/checksession/', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                return response.status
            })
            .then(status => {
                if(status===200) this.setState({loggedIn:true})
                else this.setState({loggedIn:false})

                if(this.state.loggedIn){
                    this.fetchUserData()
                    this.fetchUserInventory()
                }
            })
    }

    fetchUserInventory() {
        fetch('https://104.194.242.202:8000/inventory/items', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                return response.json()
            })
            .then(result => {

                if (result["detail"] === "Unauthenticated!1") {
                    return
                }
                if (result["detail"] === "Unauthenticated!2") {
                    return
                }
                console.log(result)

                this.setState({inventory: result})
                console.log(this.state.inventory)
            });

    }


    fetchUserData() {

        let user = {...this.state.user}
        fetch('https://104.194.242.202:8000/user/me/', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                return response.json()
            })
            .then(result => {
                user["level"] = result.level
                fetch('https://104.194.242.202:8000/user/meSteam/', {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                    .then(response => {
                        return response.json()
                    })
                    .then(result => {
                            user["steamId"] = result["steamId"]
                            user["name"] = result["username"]
                            if (result["avatarHash"] === null) user["profilePic"] = StandardProfilePic
                            else  user["profilePic"] = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/" + result["avatarHash"] + "_full.jpg"
                        this.setState({user})
                        }
                    );
            });

    }

    handleDepositClick = () => {
        this.setState({deposit:"flex"})
    }
    handleCloseDepositClick = () => {
        this.setState({deposit:"none"})
    }

    handleConfirmDepositClick = (inventory) => {
        this.setState({deposit:"none"})
        //Manda una richiesta di prelievo dei seguenti item al backend che controllera` se sono prelevabili o meno
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                items: inventory.filter(item=>item.selected===true)
            })
        };
        fetch('https://104.194.242.202:8000/inventory/deposit', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }

    handleWithdrawClick = () => {
        //Manda una richiesta di prelievo dei seguenti item al backend che controllera` se sono prelevabili o meno
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                items: this.state.inventoryItemsSelected
            })
        };
        fetch('https://104.194.242.202:8000/inventory/withdraw', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }

    handleInventorySelection = (event,itemSelected) =>{
        let elem = event.currentTarget;
        let tempInv= [...this.state.inventoryItemsSelected]
        if(this.state.inventoryItemsSelected.includes(itemSelected)){
            tempInv=tempInv.filter(item=>item!==itemSelected)
            this.setState({inventoryItemsSelected:tempInv})
            elem.style.border = "1px solid white";
        }else{
            tempInv.push(itemSelected)
            this.setState({inventoryItemsSelected:tempInv})
            elem.style.border = "10px solid white";
        }
    }

    render() {
        const handlers={
            deposit:this.handleDepositClick,
            withdraw:this.handleWithdrawClick,
            closeDeposit:this.handleCloseDepositClick,
            confirmDeposit:this.handleConfirmDepositClick,
            select:this.handleInventorySelection,
        }
        return (
            <div className="App">
                <div className="box">
                    <Deposit user={this.state.user} display={this.state.deposit} handlers={handlers}/>
                    <Withdraw/>
                    <Header user={this.state.user} loggedIn={this.state.loggedIn}/>
                    <section className="content">
                        <Content user={this.state.user}/>
                        <RightSide inventory={this.state.inventory} handlers={handlers}/>
                    </section>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default App;
