"use strict";

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

	cards.cards.favorites = localStorage.getItem("favCards")
		? JSON.parse(localStorage.getItem("favCards"))
		: [];


	let catIndex = Object.keys(cards.cards).indexOf(categoryName);

	if (categoryName === "custom" && cards.cards.custom.length == 0) {
		html += `<div class="no-cards">
      <h2>You haven't created any custom cards yet</h2><p>Don't fear! You can make them here!</p><button class="button-primary" onClick="document.location='./custom-creation.html'">Make A Custom Card</button></div>`;
	}
	else if (categoryName === "favorites" && cards.cards.favorites.length === 0) {
		html += `<div class="no-cards"><h2>No Cards Added To Favorites</h2><p>Try clicking on the heart icon near the top right of the card to add it to your favorites.</p></div>`;
	}
	else {
		for (let card of cards.cards[categoryName]) {
			const isFav = cards.cards.favorites.some(fav =>
				fav.text === card.text && fav.icon.unicode === card.icon.unicode
			);

			const favClass = isFav ? "favorite" : "";
			const favAriaLabel = isFav ? "Remove card from favorites" : "Save card to favorites"

			html += `
				<div class="card" tabindex="0">
					<span class="heart-icon ${favClass}" role="button" tabindex="0" aria-label="${favAriaLabel}">
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


	$(`${panelId}`).html(html).addClass("js-tabcontent");

	$("#tabs").tabs("option", "active", catIndex);
	$("#mobileTabSelect").val(categoryName).trigger("change");

	// add event listeners for the new cards and heart
	$(".card-content").on("click", speakPhrase);
	$(".heart-icon").on("click", saveToFavorites);

	$("#tabs").tabs("refresh");
}

function speakPhrase(e) {
	e.preventDefault();
	let audioOn = localStorage.getItem("audioOn");

	audioOn = audioOn === null ? true : audioOn === "true"
	let $card = $(this).closest(".card");

	if ($.fullscreen.isFullScreen()) {
		$.fullscreen.exit();
	}


	if (!audioOn) {
		$card.fullscreen({
			toggleClass: "fullscreen-mode"
		});
	} else {
		if (responsiveVoice.voiceSupport()) {
			responsiveVoice.cancel();
			let voice = localStorage.getItem("selectedVoice");
			let pitch = localStorage.getItem("pitch");
			if (voice) {
				responsiveVoice.setDefaultVoice(voice);
			}
			let options = {
				pitch: pitch,
			};
			
			responsiveVoice.speak(e.currentTarget.innerText, voice, options);
		}else {
			console.error("browser does not support tts")
			localStorage.setItem("audioOn", "false");
		}
	}

}

function saveToFavorites(e) {
	e.preventDefault();

	// get icon element
	const $icon = $(e.currentTarget);

	// get card element
	const $card = $icon.closest(".card");

	// extract text and unicode from card
	const cardText = $card.find(".card-text").text().trim();
	const emojiCode = $card.find(".emoji").data("unicode");

	const cardToSave = {
		icon: emojiList.find((emoji) => emoji.unicode === emojiCode),
		text: cardText,
	}

	let favCards = JSON.parse(localStorage.getItem("favCards")) || [];

	const isFav = $icon.hasClass("favorite")

	if (isFav) {
		// remove from favorites if it's there and the heart gets pressed
		favCards = favCards.filter(card => !(card.text === cardText && card.icon.unicode === emojiCode))
		$icon.removeClass("favorite")
		$icon.attr("aria-label", "Save card to favorites");
	} else {
		favCards.push(cardToSave)
		$icon.addClass("favorite");
		$icon.attr("aria-label", "Remove card from favorites");
	}

	localStorage.setItem("favCards", JSON.stringify(favCards));
	$icon.trigger('blur');
}

function updateTabs(e) {
	e.preventDefault();
	let selectedTab = e.target.value;
	$(`#tabs a[href='${hrefMap[selectedTab]}']`).click()

}

$(function () {
	// check if pref are set to load another category on page load and if not set to general
	let categoryPref = localStorage.getItem("categoryPref")
		? localStorage.getItem("categoryPref")
		: "general";



	// initialize the tabs
	$("#tabs").tabs({
		activate: function (event, ui) {
			loadCards(ui.newPanel[0].attributes.id.value);
		},
		classes: {
			"ui-tabs-panel": "category"
		}
	});


	// initialize the dropdown menu for mobile category selection (replaces tabs)
	$("#mobileTabSelect").select2({
		minimumResultsForSearch: Infinity,
		width: "100%"
	});


	$("#mobileTabSelect").on("change", updateTabs)
	$(".card").on("click", ".heart-icon", saveToFavorites);
	loadCards(categoryPref);
	$("#tabs .ui-corner-all, #tabs .ui-corner-top, #tabs .ui-corner-bottom").removeClass("ui-corner-all ui-corner-top ui-corner-bottom");
	$(document).on("fullscreenchange webkitfullscreenchange mozfullscreenchange", function () {
		if (!$.fullscreen.isFullScreen()) {
			$(".fullscreen-mode").removeClass("fullscreen-mode");
		}
		$(document).on("click", ".card.fullscreen-mode", function () {
			if ($.fullscreen.isFullScreen()) {
				$.fullscreen.exit();
			}
		});
	});
});
