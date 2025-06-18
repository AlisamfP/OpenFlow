let customCards = []
let currentEmojiCode = ""

function loadEmojis(){
    let html = "";
    for(let emoji of emojiList){
        html += `<div class="emoji" id=${emoji.unicode}>
            <img src="https://openmoji.org/data/color/svg/${emoji.unicode}.svg" alt="${emoji.name.replace(/-/g, ' ')}">
            <p>${emoji.name.replace(/-/g, ' ')}</p>
        </div>`
    }

    $("#all-emojis").html(html);
}

function filterEmojiList(e){
    e.preventDefault();
    let searchTerm = $("#emojiFilter").val().trim().toLowerCase();
    let emojiListItems = document.querySelectorAll(".emoji");
    emojiListItems.forEach(function(item) {
        item.style.display = 'flex';
        if(!item.innerText.toLowerCase().includes(searchTerm)){
            item.style.display = 'none';
        }
    })
}

function updatePreview(e){
    e.preventDefault();
    console.log("update preview")
    console.log(e)
    let text = $("#cardText").val();
    let unicode = e.currentTarget.id
    let emojiName = e.currentTarget.innerText
    if(unicode != "cardText"){
        if(currentEmojiCode) $(`#${currentEmojiCode}`).removeClass("active");
        currentEmojiCode = unicode;
        $(`#${unicode}`).addClass("active");
        let html = `<img src="https://openmoji.org/data/color/svg/${unicode}.svg" alt=${emojiName}>
        <p>${text}</p>`
        $(".card").html(html);
    }
    else {
        $(".card p").text(text);
    }
}

function createCard(){
    console.log("Create card")
    $("#cardText").removeClass("errorInput");

    if($("#cardText").val().trim() === ""){
        console.log("no text")
        $("#cardText").addClass("errorInput");
    }
    else {
        let card = {
            icon: emojiList.find((emoji) => emoji.unicode === currentEmojiCode),
            text: $("#cardText").val().trim()
        }
        console.log("CARD CREATED")
        console.log(card)
        customCards.push(card);
        localStorage.setItem("customCards", JSON.stringify(customCards))
        
    }
}
 
$(function(){
    console.log("ready");
    loadEmojis();

    $(".emoji").on("click", updatePreview);
    $("#cardText").on("input", updatePreview);
    $("#emojiFilter").on("input", filterEmojiList);
    $("#createBtn").on("click", createCard);
})