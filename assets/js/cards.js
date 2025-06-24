"use strict";

// TODO List
// createCard, editCard, removeCard
// allow for favorites cards
const hrefMap = {
	general: "#general_first",
	feelings: "#feelings_second",
	custom: "#custom_third",
	favorites: "#favorites_fourth"
}

function loadCards(category) {
	let cards = cardList;
	let html = "";
	// shouldn't have to split it, but just in case we get the id panel name
	let categoryName = category.split("_")[0];

	// get panelId from category name using map above
	let panelId = hrefMap[categoryName];

	// add the cards into the cardlist for faster loading
	cards.cards.custom = localStorage.getItem("customCards")
		? JSON.parse(localStorage.getItem("customCards"))
		: [];


	let catIndex = Object.keys(cards.cards).indexOf(categoryName);

	if (categoryName === "custom" && cards.cards.custom.length == 0) {
		html += `<div>
      You haven't created any custom cards yet</div>`;
	} else {
		for (let card of cards.cards[categoryName]) {
			console.log(card)
			// iconName, unicode, text
			html += `
        <div class="card" tabindex="0">
            <span class="heart-icon" role="button" tabindex="0" aria-label="Like this card">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
					fill="currentColor" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
					stroke-linejoin="round">
					<path
						d="M12 10.375c0-2.416-1.959-4.375-4.375-4.375S3.25 7.959 3.25 10.375c0 1.127.159 2.784 1.75 4.375l7 5.25s5.409-3.659 7-5.25 1.75-3.248 1.75-4.375c0-2.416-1.959-4.375-4.375-4.375S12 7.959 12 10.375z" />
				</svg>
            </span>
            <section class="card-content">
                <img class="emoji" src="https://openmoji.org/data/color/svg/${card.icon.unicode
				}.svg" alt="${card.icon.name.replace(/-/g, " ")}" role="img" data-unicode="${card.icon.unicode}">
                <h3 class="card-text">${card.text}</h3>
            </section>
        </div>`;
		}
	}

	// html += "</div>";

	console.log("catindex....", catIndex)
	$(`${panelId}`).html(html).addClass("js-tabcontent");

	$("#tabs").tabs("option", "active", catIndex);
	$("#mobileTabSelect").val(categoryName).trigger("change");

	// add event listeners for the new cards and star
	$(".card-content").on("click", speakPhrase);
	$(".star").on("click", saveStarred);

	$("#tabs").tabs("refresh");
}

function speakPhrase(e) {
	e.preventDefault();

	if (responsiveVoice.voiceSupport()) {
		console.log("browser supports tts");
	}

	responsiveVoice.cancel();
	let voice = localStorage.getItem("selectedVoice");
	let pitch = localStorage.getItem("pitch");
	console.log(voice);
	if (voice) {
		console.log("theres a voice...", voice);
		responsiveVoice.setDefaultVoice(voice);
	}
	let options = {
		pitch: pitch,
	};

	responsiveVoice.speak(e.currentTarget.innerText, voice, options);
}

function saveStarred(e) {
	e.preventDefault();
	console.log("STARRR");
	console.log(e);
}

function updateTabs(e){
	e.preventDefault();
	let selectedTab = e.target.value;
	$(`#tabs a[href='${hrefMap[selectedTab]}']`).click()

}

$(function () {
	console.log("ready");
	// getAllEmojis()
	// check if pref are set to load another category on page load and if not set to general
	let categoryPref = localStorage.getItem("categoryPref")
		? localStorage.getItem("categoryPref")
		: "general";

	console.log(localStorage.getItem("categoryPref"))

	console.log("PREF ISS...", categoryPref)

	$("#tabs").tabs({
		activate: function (event, ui) {
			loadCards(ui.newPanel[0].attributes.id.value);
		},
		classes: {
			"ui-tabs-panel": "category"
		}
	});


	$("#nav-list").slicknav({
		label: "Menu",
		prependTo: "nav",
	});


	// slick shows hamburger button using css
	// since it generates the spans for it, but I'm not using their css
	// replacing the generated spans with unicode
	$(".slicknav_icon").html("\u2630");

	
	
	$("#mobileTabSelect").select2({
		minimumResultsForSearch: Infinity,
		width: "100%"
	});
	
	console.log($("#mobileTabSelect"))
	
	$("#mobileTabSelect").on("change", updateTabs)
	loadCards(categoryPref);
});
