function toggleDarkMode(){
    console.log("toggled");
    let theme = $("html").attr("data-theme");

    if (theme === "dark") {
        theme = "light";
    } else {
        theme = "dark";
    }

    $("html").attr("data-theme", theme);
    $(".input-desc").text(theme === "dark" ? "Dark Mode Active" : "Light Mode Active");

    // Save preference to localStorage
    localStorage.setItem("theme", theme);
    
}


$(function () {
    console.log("ready");
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
    $(".input-desc").text(currentTheme === "dark" ? "Dark Mode Active" : "Light Mode Active");

    $("#darkModeToggle").prop("checked", currentTheme === "dark")

    // slick shows hamburger button using css
    // since it generates the spans for it, but I'm not using their css
    // replacing the generated spans with unicode
    $(".slicknav_icon").html("\u2630");

    $("#darkModeToggle").on("input", toggleDarkMode)
});