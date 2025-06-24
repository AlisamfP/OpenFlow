let customCards = [];
let currentEmojiCode = "";

function formatEmoji(emoji) {
    if (!emoji.id) return emoji.text;
    // if(emoji.id === "placeholder"){
    //     return;
    // }
    let $emoji =
        $(`<span class="emoji-selection"><img loading="lazy" class="emoji" src="https://openmoji.org/data/color/svg/${emoji.id}.svg" alt="${emoji.element.id}">
            <p>${emoji.element.id}</p></span>`);
    return $emoji;
}

function loadEmojis() {
    let html = `<option class="placeholder"></option>`;
    for (let emoji of emojiList) {
        html += `<option class="emoji-wrapper" id=${emoji.name} value="${emoji.unicode
            }">${emoji.name.replace(/-/g, " ")}
        </option>`;
    }

    $("#emojiSelect").html(html);

    $("#emojiSelect").select2({
        placeholder: "Search emojis or browse below",
        templateResult: formatEmoji,
        templateSelection: formatEmoji,
    });
}

function updatePreview(type) {
    $("#cardText").removeClass("errorInput");
    console.log("update preview");

    let text = $("#cardText").val();

    if (type === "text") {
        if ($("#card-preview .card-text").length == 0) {
            $("#card-preview .card-content").append(`<h3 class="card-text">${text}<h/3>`);
        }
        $("#card-preview .card-text").text(text);
        return;
    }

    let $selectedEmoji = $("#emojiSelect").find(":selected")[0];
    let unicode = $selectedEmoji.value;
    let emojiName = $selectedEmoji.id;

    // console.log(text, unicode, emojiName)

    let html = `        
        <img 
            class="emoji"
            src="https://openmoji.org/data/color/svg/${unicode}.svg" alt=${emojiName}
            role="img"
            data-unicode="${unicode}">
        <h3 class="card-text">${text}</h3>`;
    $("#card-preview .card-content").html(html);
}

function createCard(e) {
    e.preventDefault();

    // remove the error class from the input
    $("#cardText").removeClass("errorInput");
    let $selectedEmoji = $("#emojiSelect").find(":selected")[0];
    let text = $("#cardText").val().trim();
    let unicode = $selectedEmoji.value;

    if ($("#cardText").val().trim() === "") {
        console.log("no text");
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
                y: 100,
            },
            stopOnFocus: true, // Prevents dismissing of toast on hover
            ariaLive: "polite",
        }).showToast();
    } else {
        let card = {
            icon: emojiList.find((emoji) => emoji.unicode === unicode),
            text: text,
        };
        customCards.push(card);
        localStorage.setItem("customCards", JSON.stringify(customCards));

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
                y: 100,
            },
            stopOnFocus: true, // Prevents dismissing of toast on hover
            ariaLive: "polite",
        }).showToast();

        // after creating card, clear out the preview
        $("#card-preview .card-content").text("");

        // load cards after creation
        loadCustomCards();
    }
}

function deleteCard(e) {
    console.log("IN DELETE")
    e.preventDefault();
    // get card
    let $card = $(e.currentTarget).closest(".card");

    // get card text
    let cardText = $card.find(".card-text").text().trim();
    let cardEmojiCode = $card.find(".emoji").data("unicode");

    console.log(cardEmojiCode);

    // Load current cards from localStorage
    let storedCards = JSON.parse(localStorage.getItem("customCards")) || [];

    // // Filter out the card based on text and unicode
    storedCards = storedCards.filter(card => {
        return !(card.text === cardText && card.icon.unicode === cardEmojiCode)
    });

    console.log(storedCards);

    if (storedCards.length === 0) {
        localStorage.removeItem("customCards");
    } else {
        // Save updated list to localStorage
        localStorage.setItem("customCards", JSON.stringify(storedCards));
    }

    // // Update global array
    customCards = storedCards;

    // // Remove the card from the DOM
    $card.remove();


    loadCustomCards();
}

function loadCustomCards() {
    let cardsFromStorage = localStorage.getItem("customCards");

    if (!cardsFromStorage) {
        $("#CustomCardList-section").hide();
        return;
    }

    customCards = JSON.parse(localStorage.getItem("customCards"));

    let html = "";
    for (let card of customCards) {
        html += ` <div class="card" tabindex="0">
                <span class="trash-icon" role="button" tabindex="0" aria-label="Delete this card">
                    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <!-- Lid -->
                        <path d="M8 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2h4M4 4h4" />
                        <!-- Can body -->
                        <path d="M5 6h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z" />
                        <!-- Inner lines -->
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </span>
            <section class="card-content">
                <img 
                class="emoji"
                src="https://openmoji.org/data/color/svg/${card.icon.unicode
            }.svg" 
                alt="${card.icon.name.replace(/-/g, " ")}"
                role="img"
                data-unicode="${card.icon.unicode}">
                <h3 class="card-text">${card.text}</h3>
            </section>
        </div>`;
    }


    $("#CustomCardList-section").show();
    $("#CustomCardList").html(html);
}

$(function () {
    console.log("ready");
    $("#nav-list").slicknav({
        label: "Menu",
        prependTo: "nav",
    });

    loadEmojis();
    loadCustomCards();

    // slick shows hamburger button using css
    // since it generates the spans for it, but I'm not using their css
    // replacing the generated spans with unicode
    $(".slicknav_icon").html("\u2630");

    $("#emojiSelect").on("input", () => {
        updatePreview("emoji");
    });
    $("#cardText").on("input", () => {
        updatePreview("text");
    });
    $("#createBtn").on("click", createCard);

    $("#CustomCardList").on("click", ".trash-icon", deleteCard);


});
