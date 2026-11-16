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
        const staticSound = new Audio("your-sound-file.mp3");
        let playPromise;

        /* now, i can't really break it down for you what is going on here but lets just say the "promise" thing just handles the time when something does not load */
        /* as well as multiple instances of the same sound being created or some shi */
        function toggleOverlay(show) {
                if (show) {
                    overlay.style.transition = "opacity 0.1s";
                    overlay.style.opacity = "1";
                    overlay.style.pointerEvents = "auto";
                    staticSound.currentTime = 0;
                    playPromise = staticSound.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {});
                    }
                } else {
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            staticSound.pause();
                            staticSound.currentTime = 0;
                        }).catch(() => {});
                    } else {
                        staticSound.pause();
                        staticSound.currentTime = 0;
                    }
                    requestAnimationFrame(() => {
                        overlay.style.transition = "opacity 0.4s ease";
                        overlay.style.opacity = "0";
                        overlay.style.pointerEvents = "none";
                    });
                }
        }
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
});

/* long story short, if page shows up then it makes the static opaque and dgaf if it is already opaque */
window.addEventListener("pageshow", function(event) {
    navigating = false;
    if (event.persisted || performance.getEntriesByType("navigation")[0]?.type === "back_forward") {
        overlay.style.transition = "none";
        overlay.style.opacity = "1";
        staticSound.currentTime = 0;
        staticSound.play().catch(() => {});
        setTimeout(() => {
            showStatic(0);
        }, 10000);
    }
});
})();
