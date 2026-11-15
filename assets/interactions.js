
document.addEventListener("DOMContentLoaded", function() {
    const click = document.createElement("audio");

    click.src = "assets/clicksound.ogg";
    click.preload = "auto";
    document.body.appendChild(click);

    document.addEventListener("click", function(e) {
        if (e.target.closest("a, button, input, select, textarea, label, option")) {
            click.currentTime = 0;
            click.play().catch(() => {});
        }
    });
});
