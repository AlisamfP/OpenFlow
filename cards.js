"use strict";



// TODO List
// createCard, editCard, removeCard
// tts api on card click
// allow for starred cards
// save settings in local storage




function loadCards(category){
    let cards = cardList;
    let html = "";
    html += '<div class="category">';

    
    cards.cards.custom = JSON.parse(localStorage.getItem("customCards"))
    
    console.log(cards)

    let catIndex = Object.keys(cards.cards).indexOf(category);

    for(let card of cards.cards[category]){

        console.log(card)
        // iconName, unicode, text
        html += `
        <div class="card">
            <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                <g id="line">
                    <polygon fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="35.9928,10.7363 27.7913,27.3699 9.4394,30.0436 22.7245,42.9838 19.5962,61.2637 36.0084,52.6276 52.427,61.2515 49.2851,42.9739 62.5606,30.0239 44.2067,27.3638"/>
                </g>
            </svg>
            <img src="https://openmoji.org/data/color/svg/${card.icon.unicode}.svg" alt="${card.icon.name.replace(/-/g, ' ')}">
            <p>${card.text}</p>
        </div>`;

    }

    html += '</div>';
    $(`#${category}`).html(html);
    $("#tabs").tabs({
        // set the active tab to the category that is selected
        active: catIndex,
        // call load cards when user clicks on a different tab
        activate: function(event, ui){
            loadCards(ui.newPanel[0].attributes.id.value);
        }
    })

}




$(function(){
    console.log("ready");
    // getAllEmojis()
    // check if pref are set to load another category on page load and if not set to general
    let categoryPref = localStorage.getItem("categoryPref") ? localStorage.getItem("categoryPref") : "general"
    loadCards(categoryPref);
    $("#tabs").tabs();
})