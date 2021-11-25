import JackpotSymbol from "../image/Jackpot bucket icon.png"
import CoinflipSymbol from "../image/Coinflip coin icon v2.png"
import RouletteSymbol from "../image/Roulette icon.png"
import Logo from "../image/Site logo concept 3.png"
import Currency from "../image/Site currecny logo concept 1.png"
import {Component} from "react";
import {useHistory} from 'react-router-dom';

function Header(props) {

    const history = useHistory();

    const navClickHandler = (path) => {
        history.push(path)
    }

    const navProfileClickHandler = () =>{
        if(props.loggedIn) {
            history.push("/profile")
        }else {
            window.location.href ="http://127.0.0.1:8000/user/login/"
        }
    }

    return (
        <div className="navbar">
            <div className="user-profile">
                <img onClick={() => navProfileClickHandler()} src={props.user.profilePic}
                     alt="profile" className="user-image"/>
                <p className="user-name">{props.user.name}</p>
            </div>
            <div className="modes">
                <img src={JackpotSymbol} alt="" className="jackpot"/>
                <img src={CoinflipSymbol} alt="" className="coinflip"/>
                <img src={RouletteSymbol} alt="" className="roulette"/>
            </div>
            <div className="logo">
                <img src={Logo} alt="image" className="logo-image"/>
            </div>
            <div className="socials">

            </div>
            <div className="others">
                <p className="nav-button free-chips">FREE CHIPS</p>
                <p onClick={() => navClickHandler("/shop")} className="nav-button shop">SHOP</p>
                <p className="nav-button deposit">DEPOSIT</p>
                <p className="coins">
                    <img src={Currency} alt=""/>
                    1210,20
                </p>
            </div>
        </div>
    );

}

export default Header

