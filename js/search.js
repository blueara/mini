function parseBSRSJSON(json){
    let items = JSON.parse(json);
    items = getItems(items.getSafeRestaurantList.body.items.item);

    return items;
}

function getItem(jsonItem){
    function getGeo(geom){
        let result = null;

        if(geom.length !== 0){
            result = geom.slice(6, -1).split(' ');
        }
    
        return result;
    }

    let item = {
        addr: jsonItem.addrs,
        name: jsonItem.biz_nm,
        tel: jsonItem.biz_tel,
        geo: getGeo(jsonItem.geom)
    }

    return item;
}

function getItems(jsonItems){
    for(let i in jsonItems){
        jsonItems[i] = getItem(jsonItems[i]);
    }

    let itemList = {
        items : jsonItems,

        //text 문자열을 포함하는 주소값을 가진 items 객체의 배열을 반환.
        searchAddr : function(text){
            let result = new Array();
            for(let i in this.items){
                if(this.items[i].addr.includes(text)){
                    result.push(this.items[i]);
                }
            }
            return result;
        }

    }
    return itemList;
}