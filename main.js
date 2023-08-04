let review1, review2, review3,review4, review5, review6, review7, review8, review9, review10;

function saveHandler1() {          
    localStorage.setItem('review1', review1.value);
}

function saveHandler2() {          
  localStorage.setItem('review2', review2.value);
}

function saveHandler3() {          
  localStorage.setItem('review3', review3.value);
}

function saveHandler4() {          
  localStorage.setItem('review4', review4.value);
}

function saveHandler5() {          
  localStorage.setItem('review5', review5.value);
}

function saveHandler6() {          
  localStorage.setItem('review6', review6.value);
}

function saveHandler7() {          
  localStorage.setItem('review7', review7.value);
}

function saveHandler8() {          
  localStorage.setItem('review8', review8.value);
}

function saveHandler9() {          
  localStorage.setItem('review9', review9.value);
}

function saveHandler10() {          
  localStorage.setItem('review10', review10.value);
}

function removeHandler1() {
    localStorage.removeItem('review1');
    review1.value = '';
}

function removeHandler2() {
  localStorage.removeItem('review2');
  review2.value = '';
}

function removeHandler3() {
  localStorage.removeItem('review3');
  review3.value = '';
}

function removeHandler4() {
  localStorage.removeItem('review4');
  review4.value = '';
}

function removeHandler5() {
  localStorage.removeItem('review5');
  review5.value = '';
}

function removeHandler6() {
  localStorage.removeItem('review6');
  review6.value = '';
}

function removeHandler7() {
  localStorage.removeItem('review7');
  review7.value = '';
}

function removeHandler8() {
  localStorage.removeItem('review8');
  review8.value = '';
}

function removeHandler9() {
  localStorage.removeItem('review9');
  review9.value = '';
}

function removeHandler10() {
  localStorage.removeItem('review10');
  review10.value = '';
}

 function init() {
    review1 = document.querySelector('.review1');
    review2 = document.querySelector('.review2');
    review3 = document.querySelector('.review3');
    review4 = document.querySelector('.review4');
    review5 = document.querySelector('.review5');
    review6 = document.querySelector('.review6');
    review7 = document.querySelector('.review7');
    review8 = document.querySelector('.review8');
    review9 = document.querySelector('.review9');
    review10 = document.querySelector('.review10');

if(localStorage.getItem('review1')) {
  review1.value = localStorage.getItem('review1');
} 

if(localStorage.getItem('review2')) {
  review2.value = localStorage.getItem('review2');
}

if(localStorage.getItem('review3')) {
  review3.value = localStorage.getItem('review3');
}

if(localStorage.getItem('review4')) {
  review4.value = localStorage.getItem('review4');
}

if(localStorage.getItem('review5')) {
  review5.value = localStorage.getItem('review5');
}

if(localStorage.getItem('review6')) {
  review6.value = localStorage.getItem('review6');
}

if(localStorage.getItem('review7')) {
  review7.value = localStorage.getItem('review7');
}

if(localStorage.getItem('review8')) {
  review8.value = localStorage.getItem('review8');
}

if(localStorage.getItem('review9')) {
  review9.value = localStorage.getItem('review9');
}

if(localStorage.getItem('review10')) {
  review10.value = localStorage.getItem('review10');
}
    document.querySelector('.save1').addEventListener('click', saveHandler1);
    document.querySelector('.remove1').addEventListener('click', removeHandler1);

    document.querySelector('.save2').addEventListener('click', saveHandler2);
    document.querySelector('.remove2').addEventListener('click', removeHandler2);

    document.querySelector('.save3').addEventListener('click', saveHandler3);
    document.querySelector('.remove3').addEventListener('click', removeHandler3);

    document.querySelector('.save4').addEventListener('click', saveHandler4);
    document.querySelector('.remove4').addEventListener('click', removeHandler4);

    document.querySelector('.save5').addEventListener('click', saveHandler5);
    document.querySelector('.remove5').addEventListener('click', removeHandler5);

    document.querySelector('.save6').addEventListener('click', saveHandler6);
    document.querySelector('.remove6').addEventListener('click', removeHandler6);

    document.querySelector('.save7').addEventListener('click', saveHandler7);
    document.querySelector('.remove7').addEventListener('click', removeHandler7);

    document.querySelector('.save8').addEventListener('click', saveHandler8);
    document.querySelector('.remove8').addEventListener('click', removeHandler8);

    document.querySelector('.save9').addEventListener('click', saveHandler9);
    document.querySelector('.remove9').addEventListener('click', removeHandler9);

    document.querySelector('.save10').addEventListener('click', saveHandler10);
    document.querySelector('.remove10').addEventListener('click', removeHandler10);
}

window.addEventListener('load', init);