let customCards = []
let currentEmojiCode = ""

function formatEmoji(emoji) {
    if (!emoji.id) return emoji.text;
    // if(emoji.id === "placeholder"){
    //     return;
    // }
    let $emoji = $(`<span class="emoji-selection"><img loading="lazy" class="emoji" src="https://openmoji.org/data/color/svg/${emoji.id}.svg" alt="${emoji.element.id}">
            <p>${emoji.element.id}</p></span>`)
    return $emoji;
}

function loadEmojis() {
    let html = `<option class="placeholder"></option>`;
    for (let emoji of emojiList) {
        html += `<option class="emoji-wrapper" id=${emoji.name} value="${emoji.unicode}">${emoji.name.replace(/-/g, ' ')}
        </option>`
    }

    $("#emojiSelect").html(html);

    $("#emojiSelect").select2({
        placeholder: "Search emojis or browse below",
        templateResult: formatEmoji,
        templateSelection: formatEmoji
    })
}



function updatePreview(type) {
    $("#cardText").removeClass("errorInput");
    console.log("update preview")

    let text = $("#cardText").val();

    if(type === "text"){
        if($(".card-text").length == 0){
            $(".card-content").append(`<h3 class="card-text">${text}<h/3>`)
        }
        $(".card-text").text(text)
        return;
    }

    let $selectedEmoji = $('#emojiSelect').find(":selected")[0];
    let unicode = $selectedEmoji.value;
    let emojiName = $selectedEmoji.id;

    // console.log(text, unicode, emojiName)

    let html = `        
        <img 
            class="emoji"
            src="https://openmoji.org/data/color/svg/${unicode}.svg" alt=${emojiName}
            role="img">
        <h3 class="card-text">${text}</h3>`
    $(".card-content").html(html);


}

function createCard(e) {
    e.preventDefault();

    // remove the error class from the input
    $("#cardText").removeClass("errorInput");
    let $selectedEmoji = $('#emojiSelect').find(":selected")[0];
    let text = $("#cardText").val().trim();
    let unicode = $selectedEmoji.value;

    if ($("#cardText").val().trim() === "") {
        console.log("no text")
        $("#cardText").addClass("errorInput");
        Toastify({
            text: "Please enter text for the card",
            duration: 3000, // -1 for forever toast
            selector: "CustomCardCreation",
            className: "toast toast-error",
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            offset: {
                x: 0,
                y: 100
            },
            stopOnFocus: true, // Prevents dismissing of toast on hover
            ariaLive: "polite"
        }).showToast();
    }
    else {
        let card = {
            icon: emojiList.find((emoji) => emoji.unicode === unicode),
            text: text
        }
        customCards.push(card);
        localStorage.setItem("customCards", JSON.stringify(customCards))

        Toastify({
            text: "Card successfully created",
            duration: 3000, // -1 for forever toast
            selector: "CustomCardCreation",
            className: "toast",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            offset: {
                x: 0,
                y: 100
            },
            stopOnFocus: true, // Prevents dismissing of toast on hover
            ariaLive: "polite"
        }).showToast();
    }
}

$(function () {
    console.log("ready");
    $("#nav-list").slicknav({
        label: "Menu",
        prependTo: "nav"
    });


    // slick shows hamburger button using css
    // since it generates the spans for it, but I'm not using their css
    // replacing the generated spans with unicode
    $(".slicknav_icon").html("\u2630");
    loadEmojis();

    $("#emojiSelect").on("input", () => {
        updatePreview("emoji")
    });
    $("#cardText").on("input", () => {
        updatePreview("text")
    });
    $("#createBtn").on("click", createCard);

})