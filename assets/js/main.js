$(function () {
    console.log("ready");
    // initialize the nav bar
    $("#nav-list").slicknav({
        label: "Menu",
        prependTo: "nav"
    });

    // slick shows hamburger button using css
    // since it generates the spans for it, but I'm not using their css
    // replacing the generated spans with unicode
    $(".slicknav_icon").html("\u2630");
});