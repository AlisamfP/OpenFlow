"use strict";

// TODO List
// createCard, editCard, removeCard
// allow for starred cards
const hrefMap = {
	general: "#general_first",
	feelings: "#feelings_second",
	custom: "#custom_third",
	starred: "#starred_fourth"
}

function loadCards(category) {
	let cards = cardList;
	let html = "";
	html += `<div id="${hrefMap[category]}" class="js-tabcontent category">`;
	let categoryName = category.split("_")[0];


	cards.cards.custom = localStorage.getItem("customCards")
		? JSON.parse(localStorage.getItem("customCards"))
		: [];

	console.log("CATEGORY IS....", categoryName);

	let catIndex = Object.keys(cards.cards).indexOf(categoryName);

	if (categoryName === "custom" && cards.cards.custom.length == 0) {
		html += `<div>
      You haven't created any custom cards yet</div>`;
	} else {
		for (let card of cards.cards[categoryName]) {
			// iconName, unicode, text
			html += `
        <div class="card" tabindex="0">
            <span class="star" role="button" tabindex="0" aria-label="Star this card">
                <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <polygon fill="currentColor" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="35.9928,10.7363 27.7913,27.3699 9.4394,30.0436 22.7245,42.9838 19.5962,61.2637 36.0084,52.6276 52.427,61.2515 49.2851,42.9739 62.5606,30.0239 44.2067,27.3638"/>
                    </g>
                </svg>
            </span>
            <section class="card-content">
            <img 
              class="emoji"
              src="https://openmoji.org/data/color/svg/${card.icon.unicode
				}.svg" 
              alt="${card.icon.name.replace(/-/g, " ")}"
              role="img">
            <h3 class="card-text">${card.text}</h3>
            </section>
        </div>`;
		}
	}

	html += "</div>";
	$(`#${category}`).html(html);
	$("#tabs").tabs({
		// set the active tab to the category that is selected
		active: catIndex,
		// call load cards when user clicks on a different tab
		activate: function (event, ui) {
			loadCards(ui.newPanel[0].attributes.id.value);
		},
	});

	$("#mobileTabSelect").val(categoryName).trigger("change");

	// add event listeners for the new cards and star
	$(".card-content").on("click", speakPhrase);
	$(".star").on("click", saveStarred);
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

	console.log("PREF ISS...", categoryPref)


	loadCards(categoryPref);
	// $("#tabs").tabs();
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
});
