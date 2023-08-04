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
        searchAddr : function(query){
            let result = new Array();
            for(let i in this.items){
                if(this.items[i].addr.includes(query)){
                    result.push(this.items[i]);
                }
            }
            return result;
        },
        searchItems : function(query){
            let result = new Array();
            for(let i in this.items){
                if(this.items[i].addr.includes(query) || this.items[i].name.includes(query)){
                    result.push(this.items[i]);
                }
            }
            return result;
        }

    }
    return itemList;
}

function createSearchList(jsonItems, query){
    let items = jsonItems.searchItems(query);
    
    for(let i in items){
        let searchResult = document.createElement('div');
        let name = document.createElement('span');
        let tel = document.createElement('span');
        let addr = document.createElement('span');

        searchResult.setAttribute('class', 'searchResult');
        name.setAttribute('class', 'jsonName');
        tel.setAttribute('class', 'jsonTel');
        addr.setAttribute('class', 'jsonAddr');

        name.innerHTML = items[i].name;
        tel.innerHTML = items[i].tel;
        addr.innerHTML = items[i].addr;

        searchResult.setAttribute('key', i);
        searchResult.appendChild(name);
        searchResult.appendChild(tel);
        searchResult.appendChild(addr);

        if(items[i].geo){
            searchResult.setAttribute('data-lat', items[i].geo[1]);
            searchResult.setAttribute('data-lng', items[i].geo[0]);
        }

        items[i] = searchResult;
    }

    return items;
}

function searchListClickHandler(event){
    let url = 'https://map.naver.com/v5/search/';
    
    //event.target이 span태그인지 판별. div라면 true
    if(event.target.querySelector('.jsonAddr')){
        url += encodeURIComponent(event.target.querySelector('.jsonAddr').innerHTML);
    } else {
        url += encodeURIComponent(event.target.parentNode.querySelector('.jsonAddr').innerHTML);
    }

    if(event.target.getAttribute('data-lat') && event.target.getAttribute('data-lng')){
        url += '?lat=' + event.target.getAttribute('data-lat');
        url += '&lng=' + event.target.getAttribute('data-lng');
    }

    window.open(url);
}