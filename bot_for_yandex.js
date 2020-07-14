// ==UserScript==
// @name         bot_for_yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==


let searchBtn = document.getElementsByClassName('mini-suggest__button')[0];
let links = document.links;
let site = location.host;
function getRandom(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}

function writhKeyword(word){
    let i=0;
    let timerId = setInterval(()=>{
        text.value+=word[i];
        i++;
        if(i==word.length){
            clearInterval(timerId);
            searchBtn.click();

       }
    },1000);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Если document.getElementsByClassName('home-logo__default')[0] !=undefined, значит мы на главной странице YANDEX
if(document.getElementsByClassName('home-logo__default')[0] !=undefined){
    let sites ={
        "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой", "Как звучит флейта", "Тромбон", "Что такое валторна", "Фагот", "Скрипка", "Виолончель"],
        "crushdrummers.ru":["Шоу барабанщиков","Барабанное шоу","Заказать выступление барабанщиков","Crush барабанщики"]
    };
    let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
    let keywords = sites[site];
    let keyword = keywords[getRandom(0,keywords.length)];
    document.cookie = "site="+site;
    writhKeyword(keyword);
}
//Иначе если location.hostname == "yandex.ru", то это страница с поисковой выдачей
else if (location.hostname =="yandex.ru"){
    let flag = true;
    let site = getCookie("site");
    for(let i=0;i<links.length;i++){
       if(links[i].href.indexOf(site)!=-1){
           let link = links[i];
           flag=false;
         links[i].setAttribute('target', '_self');
         setTimeout(()=>{link.click()},getRandom(1000,3000));
         break;
       }

    }
    if (document.getElementsByClassName('pager__item pager__item_current_yes pager__item_kind_page')[0].textContent > 10){
        flag = false;
        location.href = "https://yandex.ru/";
    }
    if (flag) setTimeout(()=>{document.getElementsByClassName('pager__item_kind_next')[0].click()},getRandom(3000,6000));
}
// Иначе мы находимся на искомом сайте
else {
     setInterval(()=>{
         if (getRandom(0,101)>=70) location.href = "https://yandex.ru/";
         else{
             let index = getRandom(0,links.length);
             if(links[index].href.indexOf(site)!=-1)
                 links[index].click();
         }
     },getRandom(2000,6000));
}
