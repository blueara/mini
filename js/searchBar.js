function iconClickHandler(event){
    event.target.closest('#searchBox').submit();
}

function searchBar(){
    document.querySelector('.bi-search').addEventListener('click', iconClickHandler);
}

window.addEventListener('load', searchBar);