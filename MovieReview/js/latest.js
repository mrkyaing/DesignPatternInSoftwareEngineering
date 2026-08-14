function getLatestMediaByReleaseDate(items, limit = 12) {
    return [...items]
        .filter((item) => item && item.release_date)
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .slice(0, limit);
}

function createLatestCard(item) {
    const year = item.release_date ? item.release_date.substring(0, 4) : "";

    return `
        <article class="movie-card">
            <a href="movie-detail.html?id=${item.id}">
                <div class="movie-poster-wrapper">
                    <img
                        class="movie-poster"
                        src="${item.poster}"
                        alt="${item.title}"
                        loading="lazy"
                    >
                    <span class="movie-type">${item.type}</span>
                </div>
                <div class="movie-card-content">
                    <h3>${item.title}</h3>
                    <div class="movie-card-meta">
                        <span>${year}</span>
                        <span>•</span>
                        <span>${item.runtime_minutes} min</span>
                    </div>
                    <p class="movie-card-description">${item.short_description || item.description}</p>
                </div>
            </a>
        </article>
    `;
}

function displayLatestMedia(items) {
    const container = document.getElementById("latest-media-container");
    const countEl = document.getElementById("latest-count");
    const noResults = document.getElementById("no-results");

    if (!container) {
        return;
    }

    if (!items.length) {
        container.innerHTML = "";
        if (noResults) {
            noResults.classList.remove("hidden");
        }
        if (countEl) {
            countEl.textContent = "0 items found";
        }
        return;
    }

    if (noResults) {
        noResults.classList.add("hidden");
    }

    container.innerHTML = items.map((item) => createLatestCard(item)).join("");

    if (countEl) {
        countEl.textContent = `${items.length} latest item${items.length !== 1 ? "s" : ""}`;
    }
}

async function loadLatestMedia() {
    try {
        const response = await fetch("data/movie.json");
        if (!response.ok) {
            throw new Error("Unable to load movie.json");
        }

        const allMedia = await response.json();
        const latestMedia = getLatestMediaByReleaseDate(
            allMedia.filter((item) => item.type === "movie" || item.type === "tv"),
            12
        );

        displayLatestMedia(latestMedia);
    } catch (error) {
        console.error("Latest media load failed:", error);
        const container = document.getElementById("latest-media-container");
        if (container) {
            container.innerHTML = '<p class="no-results">Unable to load latest release list.</p>';
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof loadLatestMedia === "function") {
        loadLatestMedia();
    }
});
