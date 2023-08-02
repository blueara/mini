var xhr = new XMLHttpRequest();
var jsonItems;
xhr.addEventListener('readystatechange', ajaxHandler);

function ajaxHandler(){
    if(xhr.readyState === 4 && xhr.status === 200){
        jsonItems = parseBSRSJSON(xhr.responseText);
        console.log(jsonItems);
    }
}

function parseBSRSJSON(json){
    let items = JSON.parse(json);
    items = getItems(items.response.body.items.item);

    return items;
}

function getItems(items){

    itemList = {
        items : items,
        
        // 필요없는 부분. item개별 기능으로 들어가고 없애야함.. 
        getAddr : function (item){
            return item.addrs;
        },
        getBizNm : function (item){
            return item.biz_nm;
        },
        getBizTel : function(item){
            return item.biz_tel;
        },
        getGeo : function(item){

        },

        //text 문자열을 포함하는 주소값을 가진 items 객체의 배열을 반환.
        searchAddr : function(text){
            let result = new Array();
            for(let i in this.items){
                if(this.getAddr(this.items[i]).includes(text)){
                    console.log(this.getAddr(this.items[i]));
                    result.push(this.items[i]);
                }
            }
            return result;
        }
    }
    return itemList;
}