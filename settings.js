function loadVoices() {
    let html = "";
    let voiceList = responsiveVoice.getVoices();
    voiceList.sort((a, b) => a.name.localeCompare(b.name));
    for (let voice of voiceList) {
        if(localStorage.getItem("selectedVoice") === voice.name) {
            html += `<option value=${voice.name.replace(/\s/g, "-")} selected>${voice.name}</option>`;
        }
        else if (voice.name){
            html += `<option value=${voice.name.replace(/\s/g, "-")}>${voice.name}</option>`;
        }
    }
    $("#voice").html(html);
}

function saveSettings(e){
    e.preventDefault();
    let selectedVoice = $("#voice").val().replace(/-/g, " ");
    let pitch = $("#pitch-value").val();

    localStorage.setItem("selectedVoice", selectedVoice);
    localStorage.setItem("pitch", pitch)
    console.log("item saved")
}

function updatePitch(e){
    e.preventDefault();
    // update the pitch value displayed on the page
    $("#pitch-value").text(e.target.value)
}


$(function () {
    console.log("ready");
    loadVoices();
    if(localStorage.getItem("pitch")){
        $("#pitch").val(localStorage.getItem("pitch"))
        $("#pitch-value").text(localStorage.getItem("pitch"))

    }
    $("#save-voice").click(saveSettings);
    $("#pitch").on("input", updatePitch);
});
