(function() {
    document.querySelectorAll("img").forEach(img => {
        img.style.imageRendering = "auto";
    });

    let navigating = false;
    let playPromise;

    const overlay = document.createElement("div");
    const staticSound = new Audio("assets/staticsound.ogg");
    const clickSound = new Audio("assets/clicksound.ogg");

    staticSound.loop = true;
    staticSound.volume = 0.7;
    staticSound.preload = "auto";
    clickSound.preload = "auto";

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

    function appendOverlay() {
        if (document.body && !document.getElementById("static-overlay")) {
            document.body.appendChild(overlay);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", appendOverlay);
    } else {
        appendOverlay();
    }

    function showStatic(show) {
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

    document.addEventListener("click", function(e) {
        const link = e.target.closest("a");
        if (!link || navigating) return;
        if (e.ctrlKey || e.shiftKey || e.metaKey ||
            e.button !== 0 || link.target === "_blank" ||
            link.hasAttribute("download")) return;

        navigating = true;
        e.preventDefault();
        const loading = document.getElementById("loading");
        if (loading) loading.style.display = "block";

        showStatic(true);
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});

        setTimeout(function() {
            window.location.href = link.href;
        }, 1000);
    });

    window.addEventListener("pageshow", function(event) {
        navigating = false;
        const loading = document.getElementById("loading");
        if (loading) loading.style.display = "none";

        if (event.persisted || performance.getEntriesByType("navigation")[0]?.type === "back_forward") {
            overlay.style.transition = "none";
            overlay.style.opacity = "1";
            staticSound.currentTime = 0;
            playPromise = staticSound.play();
            if (playPromise !== undefined) playPromise.catch(() => {});

            setTimeout(() => {
                showStatic(false);
            }, 1000);
        }
    });
})();
