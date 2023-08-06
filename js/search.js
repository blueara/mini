var xhr = new XMLHttpRequest();
xhr.addEventListener('readystatechange', ajaxHandler);

function parseBSRSJSON(json){
    let items = JSON.parse(json);
    items = getItems(items.getSafeRestaurantList.body.items.item);

    return items;
}

//아이템 객체 정리하여 반환
function getItem(jsonItem){
    
    function getGeo(geom){
        let result = null;

        // 위도, 경도값이 있는 경우 반환
        if(geom.length !== 0){
            // POINT(129.166793254093 35.1610844272274)
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

//아이템 객체의 배열을 반환
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
        //주소, 점포명 통합검색
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

// .searchResult 테이블의 행을 만들어서 반환합니다
function createSearchList(jsonItems, query){
    let items = jsonItems.searchItems(query);
    
    for(let i in items){
        let searchResult = document.createElement('tr');
        let name = document.createElement('td');
        let tel = document.createElement('td');
        let addr = document.createElement('td');

        //css에선 .searchResult 속성을 더이상 사용하지 않음..
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

        //위도, 경도가 있을시 사용자 속성 정의
        if(items[i].geo){
            searchResult.setAttribute('data-lat', items[i].geo[1]);
            searchResult.setAttribute('data-lng', items[i].geo[0]);
        }

        items[i] = searchResult;
    }

    return items;
}

//searchList div태그내 table 요소를 클릭했을때 네이버 지도 링크를 새 창에서 열어주는 핸들러
function searchListClickHandler(event){
    let url = 'https://map.naver.com/v5/search/';

    console.log(event.target);
    console.log(event.target.nodeName);

    //event.target이 td 요소를 클릭했는지 판별. 아닐시 핸들러 종료
    if(event.target.nodeName.toLowerCase() === 'td'){
        
        url += encodeURIComponent(event.target.parentNode.children[2].innerHTML);
        
        //좌표값이 있다면 파라미터에 더함
        if(event.target.getAttribute('data-lat') && event.target.getAttribute('data-lng')){
            url += '?lat=' + event.target.getAttribute('data-lat');
            url += '&lng=' + event.target.getAttribute('data-lng');
        }
    
        window.open(url);

    } else {
        return null;
    }
}

function ajaxHandler(){
    if(xhr.readyState === 4 && xhr.status === 200){
        const query = new URL(location.href).searchParams.get('query');
        const jsonItems = parseBSRSJSON(xhr.responseText);
        let searchList = document.querySelector('.searchList');
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        let noSearch = false;

        //thead 생성
        for(let i = 0; i < 3; i++){
            tr.appendChild(document.createElement('th')); 
        }
        
        tr.children[0].innerHTML = '이름';
        tr.children[1].innerHTML = 'TEL';
        tr.children[2].innerHTML = '주소';

        table.appendChild(document.createElement('thead'));
        table.firstChild.appendChild(tr);

        console.log(new Boolean(query));

        // search.html?query= 쿼리 파라미터가 있으나 공백인 경우 null이 아닙니다
        if(query){
            let tbody = document.createElement('tbody');
            let searchResults = createSearchList(jsonItems, query);

            console.log(searchResults.length);
            if(searchResults.length !== 0){
                searchResults.forEach(element => {
                    tbody.appendChild(element);
                });
                table.appendChild(tbody);
                searchList.appendChild(table);
            } else {
                noSearch = true;
            }
        }

        if(noSearch) {
            let str = '<p id="noResult">검색된 결과가 없습니다!</p>'
            searchList.innerHTML = str;
        }
    }
}

function init(){
    xhr.open('GET', 'BusanSafeRestaurantList.json', true);
    xhr.send();
    document.querySelector('.searchList').addEventListener('click', searchListClickHandler);
    document.querySelector('#searchInput').value = new URL(location.href).searchParams.get('query');
}

window.addEventListener('load', init);