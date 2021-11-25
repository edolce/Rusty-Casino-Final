import {Component} from "react";
import Currency from "../image/Site currecny logo concept 1.png";

class InventoryItem extends Component {

    state={
        value: 0,
        borderColor: "#ffffff",
        borderColor2: "#ffffff"
    }

    componentDidMount() {
        this.fetchItemValue()
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return "rgba("+parseInt(result[1], 16)+","+parseInt(result[2], 16)+","+parseInt(result[3], 16)+",0.2)";
    }

    fetchItemValue() {
        fetch("https://api.steamapis.com/market/item/252490/"+this.props.item.name+"?api_key=_RZGP6qS311i0qsmWX44_jDc6gs", {mode: 'cors'},{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {return response.json()})
            .then(result =>  {
                this.setState({value:result["histogram"]["highest_buy_order"],borderColor:"#"+result["border_color"].replace("#",""),borderColor2:this.hexToRgb("#"+result["border_color"].replace("#",""))})
                console.log(this.state)
            });

    }

    render() {
        const bgColor = {
            backgroundColor: this.state.borderColor2,
            boxShadow:"inset 0 0 40px "+this.state.borderColor
        };
        return(
            <div onClick={(event)=>this.props.handlers.selection(event,this.props.item)} className="inv-item" style= {bgColor}>
                <div className="value-contend">
                    <img src={Currency} alt="currency"/>
                    <p className="value">{this.state.value}</p>
                </div>
                <img className="inv-item-img" src={"https://api.steamapis.com/image/item/252490/"+this.props.item.name} alt="image-item"/>
            </div>
        )
    }

}

export default InventoryItem;