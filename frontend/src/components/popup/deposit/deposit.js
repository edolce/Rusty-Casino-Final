import {Component} from "react";
import DepositItem from "./depositItem";
import InventoryItem from "../../inventoryItem";
import Utils from "../../../utils";
class Deposit extends Component {
    state={
        inventory: [],
        selected: 0,
        inventoryValue: 0
    }

    fetchData(){
        Utils.fetchSteamUserInventory(this.props.user.steamId,(items)=>
        {
            items=items.filter( item => item['trade']===1);
            let i=0;
            items.map( item =>{
                item['itemId']=i;
                item['selected']=false;
                i++;
            });
            this.setState({inventory:items});
            console.log(items)
        });
    }

    clickItem = (itemId)=>{
        let temp= [...this.state.inventory];
        console.log(temp);
        console.log(itemId);
        temp[itemId]['selected'] = !temp[itemId]['selected'];
        this.setState({inventory:temp});
    }



    componentDidUpdate(prevProps){
        if(prevProps.user.steamId !== this.props.user.steamId){
            if(this.props.user.steamId!==0){
                this.fetchData();
            }
        }
    }

    amountSelected(){
        let x=0;
        this.state.inventory.map(item=> {if(item.selected)x++})
        return x;
    }

    render() {
        return (
            <div className="deposit-popup" style= {{display:this.props.display}}>
                <div className="deposit-content">
                    <div className="deposit-top">
                        <b>STEAM INVENTORY ({this.state.inventoryValue})</b>
                        <div className="right-side">
                            <input type="text" className="search-bar"/>
                                <button className="block-button"/>
                                <button className="refresh-button"/>
                        </div>
                    </div>
                    <div className="deposit-center">
                        {this.state.inventory.filter(item=> item.trade===1).map( item => (
                                <DepositItem key={item.itemId} item={item} clickItem={this.clickItem}/>
                            )
                        )}
                    </div>
                    <div className="deposit-bottom">
                        <div className="left-side">
                            <p className="big-text">Depositing into backpack</p>
                            <p className="small-text">{this.amountSelected()}<span>/{this.state.inventory.length}</span> items selected</p>
                        </div>
                        <div className="right-side">
                            <button onClick={this.props.handlers.closeDeposit} className="cancel-button">CANCEL</button>
                            <button onClick={() => this.props.handlers.confirmDeposit(this.state.inventory)} className="deposit-button">DEPOSIT</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Deposit