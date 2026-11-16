const hover = document.getElementsByClassName("hoversound");
if (hover) {
    hover.volume = 0.035;
    document.querySelectorAll("pre a").forEach(link => {
        link.addEventListener("mouseenter", function() {
            hover.currentTime = 0;
            hover.play().catch(() => {});
        });
    });
}