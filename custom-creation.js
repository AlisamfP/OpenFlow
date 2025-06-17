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

function updatePreview(e){
    e.preventDefault();
    let text = $("#cardText").val();
    let unicode = e.currentTarget.id
    let emojiName = e.currentTarget.innerText
    if(unicode != "cardText"){
        let html = `<img src="https://openmoji.org/data/color/svg/${unicode}.svg" alt=${emojiName}>
        <p>${text}</p>`
        $(".card").html(html);
    }
    else {
        $(".card p").text(text);
    }

}
 
$(function(){
    console.log("ready");
    loadEmojis();

    $(".emoji").on("click", updatePreview)
    $("#cardText").on("input", updatePreview)
})