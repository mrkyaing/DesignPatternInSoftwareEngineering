let allLatestMedia = [];
let allCategories = [];

function getLatestMediaByReleaseDate(items, limit = 12) {
    return [...items]
        .filter((item) => item && item.release_date)
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .slice(0, limit);
}

function populateLatestGenreFilter() {
    const select = document.getElementById("genre-filter");
    if (!select) {
        return;
    }

    select.innerHTML = `
        <option value="all">All Genres</option>
        ${allCategories
            .map((category) => `
                <option value="${category.id}">${category.name}</option>
            `)
            .join("")}
    `;
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

function applyLatestFilters() {
    const searchInput = document.getElementById("movie-search");
    const genreFilter = document.getElementById("genre-filter");
    const sortFilter = document.getElementById("sort-filter");

    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const genre = genreFilter ? genreFilter.value : "all";
    const sort = sortFilter ? sortFilter.value : "default";

    let filteredMedia = [...allLatestMedia];

    if (searchTerm) {
        filteredMedia = filteredMedia.filter((item) =>
            item.title.toLowerCase().includes(searchTerm)
        );
    }

    if (genre !== "all") {
        const genreId = Number(genre);
        filteredMedia = filteredMedia.filter((item) => {
            const categoryIds = Array.isArray(item?.category_ids) ? item.category_ids : [];
            return categoryIds.includes(genreId);
        });
    }

    switch (sort) {
        case "title-asc":
            filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "title-desc":
            filteredMedia.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case "year-desc":
            filteredMedia.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            break;
        case "year-asc":
            filteredMedia.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            break;
        default:
            filteredMedia.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            break;
    }

    displayLatestMedia(filteredMedia);
}

function setupLatestFilters() {
    const searchInput = document.getElementById("movie-search");
    const genreFilter = document.getElementById("genre-filter");
    const sortFilter = document.getElementById("sort-filter");

    if (searchInput) {
        searchInput.addEventListener("input", applyLatestFilters);
    }
    if (genreFilter) {
        genreFilter.addEventListener("change", applyLatestFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener("change", applyLatestFilters);
    }

    const params = new URLSearchParams(window.location.search);
    const genre = params.get("genre");
    if (genre && genreFilter) {
        genreFilter.value = genre;
        applyLatestFilters();
    }
}

async function loadLatestMedia() {
    try {
        const [movieResponse, categoryResponse] = await Promise.all([
            fetch("data/movie.json"),
            fetch("data/category.json")
        ]);

        if (!movieResponse.ok) {
            throw new Error("Unable to load movie.json");
        }
        if (!categoryResponse.ok) {
            throw new Error("Unable to load category.json");
        }

        const allMedia = await movieResponse.json();
        allCategories = await categoryResponse.json();

        allLatestMedia = getLatestMediaByReleaseDate(
            allMedia.filter((item) => item.type === "movie" || item.type === "tv"),
            12
        );

        populateLatestGenreFilter();
        displayLatestMedia(allLatestMedia);
        setupLatestFilters();
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
