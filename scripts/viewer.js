
(function() {
    const entries = window.archiveEntries || [];
    const type = window.archiveType || "entry";

    let current = 0;

    const content = document.getElementById("archive-content");
    const counters = document.querySelectorAll(".section-number");

    function update() {
        if (!entries.length) {
            content.textContent = "no entries found.";
            counters.forEach(counter => counter.textContent = "0 / 0");
            return;
        }

        const entry = entries[current];

        counters.forEach(counter => {
            counter.textContent = `${current + 1} / ${entries.length}`;
        });

        content.replaceChildren();

        const wrapper = document.createElement("div");
        wrapper.className = "clearfix";

        if (entry.render) {
            const render = document.createElement("div");
            render.className = "render";

            const image = document.createElement("img");
            image.src = entry.render;
            image.alt = entry.name || type;

            const caption = document.createElement("small");
            caption.textContent = entry.rendercaption || "official render";

            render.append(image, caption);
            wrapper.appendChild(render);
        }

        const title = document.createElement("h2");
        title.textContent = entry.name || "untitled";

        const description = document.createElement("p");
        description.textContent = entry.description || "";

        wrapper.append(title, description);

        if (entry.sidenote) {
            const sidenote = document.createElement("p");
            sidenote.className = "sidenote";
            sidenote.textContent = entry.sidenote;
            wrapper.appendChild(sidenote);
        }

        content.appendChild(wrapper);
    }

    function changeSection(direction) {
        if (!entries.length) return;

        current = (current + direction + entries.length) % entries.length;
        update();
    }

    // all navigation buttons use the same function
    document.querySelectorAll("[data-navigation]").forEach(button => {
        button.addEventListener("click", function() {
            changeSection(Number(this.dataset.navigation));
        });
    });

    // keyboard navigation
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") changeSection(-1);
        if (e.key === "ArrowRight") changeSection(1);
    });

    update();
})();
