import {Component} from "react";

import RandomSkin from "../../image/random skin.png"

import CurrencyLogo from "../../image/Site currecny logo concept 1.png"
import Refresh from "../../image/refresh.png"
import ItemImage from "../../image/random skin.png"

class Shop extends Component {

    state = {
        response: "",
        itemInCart: 0,
    }


    componentDidMount() {
    }

    fetchData() {
        fetch('https://104.194.242.202:8000/user/me/',{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(
                response => this.setState({response:JSON.stringify(response)})
            );
    }

    handleItemClick = (event) =>{
        console.log(this);

        let elem = event.currentTarget;
        let cartContainer = document.getElementById("cartSide");
        let shopItems = document.getElementById("shopItems");



        console.log("s");


        //Se il cart non e' ancora presente aggiungerlo.
        if( window.getComputedStyle(cartContainer, null).display === "none"){
            cartContainer.style.display = "block";
            shopItems.style.gridTemplateColumns="auto auto auto auto auto"
        }

        if(elem.style.border === "1px solid white"){
            elem.style.border = "none"
            this.state.itemInCart--;
            if(this.state.itemInCart===0){
                cartContainer.style.display = "none";
                shopItems.style.gridTemplateColumns="auto auto auto auto auto auto"
            }

        }else{
            this.state.itemInCart++;
            elem.style.border = "1px solid white";
        }
    }

    render() {

        return(
        <>
            <div className="left-side">
                <div className="shop-side">
                    <div className="items-side">
                        <div className="item-title">
                            <p className="title"><b>Shop</b></p>
                            <div className="sorting-content">
                                <p><b>Price:</b></p>
                                <p><b>Descending</b></p>
                            </div>
                        </div>
                        <div id="shopItems" className="items-container">
                            <div className="item" onClick={this.handleItemClick}>
                                <img src={RandomSkin} alt="item-image" className="item-image"/>
                                    <p className="name">Glory AK</p>
                                    <div className="price">
                                        <img src={CurrencyLogo} alt="currency-logo"/>
                                            <p className="price-int">400,000</p>
                                    </div>
                            </div>
                            <div className="item" onClick={this.handleItemClick}>
                                <img src={RandomSkin} alt="item-image" className="item-image"/>
                                <p className="name">Glory AK</p>
                                <div className="price">
                                    <img src={CurrencyLogo} alt="currency-logo"/>
                                    <p className="price-int">400,000</p>
                                </div>
                            </div>
                            <div className="item" onClick={this.handleItemClick}>
                                <img src={RandomSkin} alt="item-image" className="item-image"/>
                                <p className="name">Glory AK</p>
                                <div className="price">
                                    <img src={CurrencyLogo} alt="currency-logo"/>
                                    <p className="price-int">400,000</p>
                                </div>
                            </div>
                            <div className="item" onClick={this.handleItemClick}>
                                <img src={RandomSkin} alt="item-image" className="item-image"/>
                                <p className="name">Glory AK</p>
                                <div className="price">
                                    <img src={CurrencyLogo} alt="currency-logo"/>
                                    <p className="price-int">400,000</p>
                                </div>
                            </div>
                            <div className="item" onClick={this.handleItemClick}>
                                <img src={RandomSkin} alt="item-image" className="item-image"/>
                                <p className="name">Glory AK</p>
                                <div className="price">
                                    <img src={CurrencyLogo} alt="currency-logo"/>
                                    <p className="price-int">400,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cartSide" className="cart-side">
                <div className="search-bar">
                    <input type="text"/>
                        <img src={Refresh} alt="refresh"/>
                </div>
                <div className="cart-items">
                    <div className="cart-item">
                        <img src={ItemImage} alt="item-image" className="item-image"/>
                            <p className="name">Glory AK</p>
                            <div className="price">
                                <img src={CurrencyLogo} alt="currency-logo"/>
                                    <p className="price-int">400,000</p>
                            </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}


export default Shop