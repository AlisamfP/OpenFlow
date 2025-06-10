"use strict";

function loadCards(){
    console.log("in load cards")
    console.log(cardList);

}


$(function(){
    console.log("ready");
    loadCards();
    $("#tabs").tabs();
})