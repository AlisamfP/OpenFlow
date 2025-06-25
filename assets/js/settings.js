function loadVoices() {
    let html = "";
    let voiceList = responsiveVoice.getVoices();
    voiceList.sort((a, b) => a.name.localeCompare(b.name));
    for (let voice of voiceList) {
        if (localStorage.getItem("selectedVoice") === voice.name) {
            html += `<option value=${voice.name.replace(/\s/g, "-")} selected>${voice.name}</option>`;
        }
        else if (voice.name) {
            html += `<option value=${voice.name.replace(/\s/g, "-")}>${voice.name}</option>`;
        }
    }
    // initialize the voice options dropdown
    $("#voice").html(html).select2({
        placeholder: "Choose from these available options",
        		width: "100%"
    });
    
}

function saveSettings(e) {
    e.preventDefault();
    let selectedVoice = $("#voice").val().replace(/-/g, " ");
    let pitch = $("#pitch").val();
    let volume = $("#volume").val();
    let rate = $("#rate").val();
    let categoryPref = $("#categoryPref").val();


    localStorage.setItem("selectedVoice", selectedVoice);
    localStorage.setItem("pitch", pitch);
    localStorage.setItem("volume", volume);
    localStorage.setItem("rate", rate);
    localStorage.setItem("categoryPref", categoryPref);

    // notify the user that the settings were saved
    Toastify({
        text: "Settings saved",
        duration: 3000, // -1 for forever toast
        selector: "settings",
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



$(function () {
    console.log("ready");
    // load in the voices from responsive voice
    loadVoices();

    // check if options are in local storage and if not set them to the default
    // ranges
    // pitch 0 - 2 // rate  0 - 1.5 // volume 0 - 1
    let pitch = localStorage.getItem("pitch") ? localStorage.getItem("pitch") : 1;
    let rate = localStorage.getItem("rate") ? localStorage.getItem("rate") : 0.75;
    let volume = localStorage.getItem("volume") ? localStorage.getItem("volume") : 0.5;
    let categoryPref = localStorage.getItem("categoryPref") ? localStorage.getItem("categoryPref") : "general"

    // update range with either previous or default value
    $("#pitch").val(pitch)
    $("#rate").val(rate)
    $("#volume").val(volume)
    $("#categoryPref").select2({
        minimumResultsForSearch: Infinity,
		width: "100%"
    });

    // set dropdown to previous setting
    $("#categoryPref").val(categoryPref).trigger("change");


    $("#saveSettings").click(saveSettings);

});
