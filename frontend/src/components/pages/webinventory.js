import {Component} from "react";


class WebInventory extends Component {
    state = {
        items: [],
        selectedItems:[]
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        fetch('http://127.0.0.1:8000/inventory/items',{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(
                response => this.setState({items:JSON.stringify(response)})
            );
    }



    render() {

        return(
            <div onClick={()=>this.props.handlers.selection(this.props.item)} className='profile'>
                <h1>Web Inventory</h1>
                <p>{this.state.items}</p>
            </div>
        )
    }

}

export default WebInventory