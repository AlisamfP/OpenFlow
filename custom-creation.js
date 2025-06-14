function loadEmojis(){
    let html = "";
    for(let emoji of emojiList){
        html += `
        <div class="emoji">
            <img src="https://openmoji.org/data/color/svg/${emoji.unicode}.svg" alt="${emoji.name}">
            <p>${emoji.name.replace(/-/g, ' ')}</p>
        </div>`
    }

    $("#all-emojis").html(html);
}


$(function(){
    console.log("ready");
    loadEmojis();
})