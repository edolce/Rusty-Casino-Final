class Utils {

    static fetchItemValueColor(item_name,callback) {
        fetch("https://api.steamapis.com/market/item/252490/" + item_name + "?api_key=_RZGP6qS311i0qsmWX44_jDc6gs", {mode: 'cors'}, {
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
                callback(result["histogram"]["highest_buy_order"],
                    "#" + result["border_color"].replace("#", ""),
                    this.hexToRgb("#" + result["border_color"].replace("#", ""))
                )
            });

    }

    static fetchSteamUserInventory(steamId,callback){
        fetch(`https://api.steamapis.com/steam/inventory/${steamId}/252490/2?api_key=_RZGP6qS311i0qsmWX44_jDc6gs`, {mode: 'cors'}, {
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
                console.log(result)
                let filteredResult=[]
                let i=0;
                result['descriptions'].map(item=>{
                    filteredResult.push({
                        itemId: i,
                        market_hash_name:item['market_hash_name'],
                        image_hash:item['icon_url_large'],
                        trade:item['tradable'],
                    })
                    i++;
                })
                callback(filteredResult)
            });
    }

    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return "rgba("+parseInt(result[1], 16)+","+parseInt(result[2], 16)+","+parseInt(result[3], 16)+",0.2)";
    }
}

export default Utils