(function() {

    document.querySelectorAll("img").forEach(img => {
    img.style.imageRendering = "auto";
    });
    
    let navigating = false;

    const overlay = document.createElement("div");
    const staticSound = new Audio("assets/staticsound.ogg");

    staticSound.loop = true;
    staticSound.volume = 0.7;
    staticSound.preload = "auto";

    overlay.id = "static-overlay";

    Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        zIndex: "999999",
        pointerEvents: "none",
        opacity: "0",
        backgroundImage: "url('assets/static.gif')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        backgroundRepeat: "no-repeat",
        transition: "opacity 0.1s"
    });

    document.addEventListener("DOMContentLoaded", function() {
        document.body.appendChild(overlay);
    });

    function showStatic(show) {
        if(show){
            overlay.style.opacity = "1";
            staticSound.currentTime = 0;
            staticSound.play().catch(() => {});
        }
        else{
            overlay.style.opacity = "0";
            staticSound.currentTime = 0;
        }
    }

    document.addEventListener("click", function(e) {
        const link = e.target.closest("a");

        if (!link || navigating) return;

        if (e.ctrlKey || e.shiftKey || e.metaKey ||
            e.button !== 0 || link.target === "_blank" ||
            link.hasAttribute("download")) return;

        navigating = true;
        e.preventDefault();

        showStatic(1);

        const click = new Audio("assets/clicksound.mp3");
        click.play().catch(() => {});

        setTimeout(function() {
            window.location.href = link.href;
        }, 1000);
        setTimeout(function() {
            showStatic(0);
        }, 1000);
    });
})();
