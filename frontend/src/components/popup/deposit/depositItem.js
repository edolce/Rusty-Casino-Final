import {Component} from "react";
import Utils from "../../../utils";

class DepositItem extends Component {
    state={
        market_hash_name: this.props.item.market_hash_name,
        item_value: 0,
        item_image: "https://community.akamai.steamstatic.com/economy/image/"+this.props.item.image_hash,
        borderColor: "#ffffff",
        borderColor2: "#ffffff",
    }

    fetchItem(){
        Utils.fetchItemValueColor(this.props.item.market_hash_name, (value,borderColor,borderColor2) => {
            this.setState(
                {
                    item_value:value,
                    borderColor:borderColor,
                    borderColor2:borderColor2
                }
            )
        })
    }

    componentDidMount() {
        this.fetchItem()
    }


    render() {
        if(this.state.market_hash_name==null){
            return(
                <div className="void-item"/>
            );
        }else{
            const style = {
                    backgroundColor: this.state.borderColor2,
                    boxShadow: "inset 0 0 40px " + this.state.borderColor
                };
            if(this.props.item.selected){
                style['border']="solid 1px white"
            }
            return(
                <div onClick={() => this.props.clickItem(this.props.item.itemId)}   className="deposit-item" style= {style}>
                    <p>${this.state.item_value}</p>
                    <img src={this.state.item_image} alt="random-skin" className="item-image"/>
                </div>
            );
        }
    }
}

export default DepositItem