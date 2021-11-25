import { NavLink, Switch, Route } from 'react-router-dom';

import Emoticons from "../image/Label_template_White3.png"
import Currency from "../image/Site currecny logo concept 1.png"
import ExampleItemImage from "../image/random skin.png"
import Refresh from "../image/refresh.png"
import {Component} from "react";
import InventoryItem from "./inventoryItem";

class RightSide extends Component {

    handleChatClick = () => {
        let chatContent = document.getElementById("chatContent");
        let invContent = document.getElementById("invContent");

        if (window.getComputedStyle(chatContent, null).display === "none"){
            chatContent.style.display = "flex";
            invContent.style.display = "none";
        }
    }

    handleInventoryClick = () => {
        let chatContent = document.getElementById("chatContent")
        let invContent = document.getElementById("invContent")

        if (window.getComputedStyle(invContent, null).display === "none"){
            invContent.style.display = "flex";
            chatContent.style.display = "none";
        }
    }



    handleWithdrawClick = () => {
    }

    selectionHandler = (event,item) => {
        this.props.handlers.select(event,item.itemId)
    }

    render(){
        let handlers={selection:this.selectionHandler}
        return (
            <div className="right-side">
                <div className="top-bar">
                    <button onClick={this.handleChatClick} id="chatBut" className="chat-button">CHAT</button>
                    <button onClick={this.handleInventoryClick} id="invBut" className="inventory-button">INVENTORY</button>
                </div>
                <div id="chatContent" className="chat-content">
                    <div className="messages-container"/>
                    <div className="send-container">
                        <input id="email" type="text" className="message-input"/>
                        <img src={Emoticons} alt="emoticons" className="emoticons"/>
                    </div>
                </div>
                <div id="invContent" className="inventory-content">
                    <div className="search-bar">
                        <input type="text"/>
                        <img src={Refresh} alt="refresh"/>
                    </div>
                    <div className="inv-items">
                        {this.props.inventory.map( item => (
                            <InventoryItem handlers={handlers} key={item.itemId} item={item}/>
                            ))}
                    </div>
                    <div className="menu">
                        <div className="top-menu">
                            <button onClick={this.props.handlers.withdraw} className="withdraw" id="withdrawButton">Withdraw</button>
                            <button onClick={this.props.handlers.deposit} className="deposit" id="depositButton">Deposit</button>
                        </div>
                        <button className="select-all">Select All</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RightSide




