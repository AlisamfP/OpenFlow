let audioOn = true;

function toggleDarkMode() {
    let theme = $("html").attr("data-theme");

    if(theme === "dark"){
        // change to light theme
        $("html").attr("data-theme", "light");
        $(".icon-light").removeClass("hidden")
        $(".icon-dark").addClass("hidden");
        $(".dark-mode .input-desc").text("Light Mode Active");
        localStorage.setItem("theme", "light");
    }
    else {
        $("html").attr("data-theme", "dark");
        $(".icon-dark").removeClass("hidden")
        $(".icon-light").addClass("hidden");
        $(".dark-mode .input-desc").text("Dark Mode Active");
        localStorage.setItem("theme", "dark");
    }


}

function toggleAudioOff(e) {
    e.preventDefault();
    console.log("TRIGGERING AUDIOO")
    audioOn = !audioOn;

    // Toggle icons
    $(".icon-sound-on").toggleClass("hidden", !audioOn);
    $(".icon-sound-off").toggleClass("hidden", audioOn);

    // Update aria and title
    $(this)
        .attr("aria-pressed", !audioOn)
        .attr("title", audioOn ? "Turn sound off" : "Turn sound on");

    $(".audio-mode .input-desc").text(audioOn ? "Audio On" : "Audio Off");

    // Save to localStorage if you want persistence
    localStorage.setItem("audioOn", audioOn.toString());

}


$(function () {
    // Set initial audioOn value from localStorage
    const storedAudioOpt = localStorage.getItem("audioOn");
    if (storedAudioOpt !== null) {
        audioOn = storedAudioOpt === "true";
    }
    // initialize the nav bar
    $("#nav-list").slicknav({
        label: "Menu",
        prependTo: "nav"
    });


    const savedTheme = localStorage.getItem("theme");
    let currentTheme;

    if (savedTheme) {
        // Use saved preference
        currentTheme = savedTheme;
    } else {
        // No saved preference, use system/browser preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? "dark" : "light";
    }

    $("html").attr("data-theme", currentTheme);
    $(".dark-mode .input-desc").text(currentTheme === "dark" ? "Dark Mode Active" : "Light Mode Active");
    $(".audio-mode .input-desc").text(audioOn ? "Audio On" : "Audio Off");

    // set correct icon state on load

    $("#darkModeToggle").attr("aria-pressed", currentTheme === "dark");
    $(".icon-light").toggleClass("hidden", currentTheme === "dark");
    $(".icon-dark").toggleClass("hidden", currentTheme !== "dark");
    $("#darkModeToggle .input-desc").text(currentTheme === "dark" ? "Dark Mode Active" : "Light Mode Active");


    // slick shows hamburger button using css
    // since it generates the spans for it, but I'm not using their css
    // replacing the generated spans with unicode
    $(".slicknav_icon").html("\u2630");




    // set correct icon state on load
    $(".icon-sound-on").toggleClass("hidden", !audioOn);
    $(".icon-sound-off").toggleClass("hidden", audioOn);
    $("-audio-toggle")
        .attr("aria-pressed", !audioOn)
        .attr("title", audioOn ? "Turn sound off" : "Turn sound on");

    $(".dark-mode").on("click", toggleDarkMode);
    $(".audio-mode").on("click", toggleAudioOff);

});