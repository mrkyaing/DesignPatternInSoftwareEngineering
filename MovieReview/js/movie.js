let allMovies = [];
let allCategories = [];
function getLatestMoviesByReleaseDate(limit = 6, items = allMovies) {
    return [...items]
        .filter((item) => item && item.release_date)
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .slice(0, limit);
}
/* =========================================================
   LOAD MOVIES
========================================================= */
async function loadMovies() {
    try {
        const movieResponse =await fetch('../data/movie.json');
        const categoryResponse =await fetch('../data/category.json');
        if (!movieResponse.ok) {
            throw new Error("Unable to load movie.json");
        }
        if (!categoryResponse.ok) {
            throw new Error("Unable to load category.json");
        }
        allMovies =await movieResponse.json();
        allCategories =await categoryResponse.json();
        initializeMoviePage();
    } catch (error) {
        console.error(error);
    }
}
/* =========================================================
   INITIALIZE
========================================================= */
function initializeMoviePage() {
const latestContainer =document.getElementById("latest-movies");
const movieContainer =document.getElementById("movies-container");
    /*
        Home page
    */
    if (latestContainer) {
        const latestMovies = getLatestMoviesByReleaseDate(6, allMovies);
        displayMovies(latestMovies, latestContainer);
    }
    /*
        Movies page
    */
    if (movieContainer) {
        populateGenreFilter();
        displayMovies(allMovies,movieContainer);
        updateMovieCount(allMovies.length);
        setupMovieFilters();
    }
    /*
        Sidebar
    */
    populateSidebarGenres();
}
/* =========================================================
   DISPLAY MOVIES
========================================================= */
function displayMovies(movies,container) {
    if (!container) {
        return;
    }
    container.innerHTML =movies.map(movie => {return createMovieCard(movie);}).join("");
}

/* =========================================================
   MOVIE CARD
========================================================= */
function createMovieCard(movie) {
const year =movie.release_date? movie.release_date.substring(0, 4): "";
    return `
        <article class="movie-card">
            <a href="movie-detail.html?id=${movie.id}">
                <div class="movie-poster-wrapper">
                    <img
                        class="movie-poster"
                        src="${movie.poster}"
                        alt="${movie.title}"
                        loading="lazy"
                    >
                    <span class="movie-type">${movie.type}</span>
                </div>
                <div class="movie-card-content">
                    <h3>${movie.title}</h3>
                    <div class="movie-card-meta">
                        <span>${year}</span>
                        <span>•</span>
                        <span>${movie.runtime_minutes} min</span>
                    </div>
                    <p class="movie-card-description">${movie.short_description}</p>
                </div>
            </a>
        </article>
    `;
}
/* =========================================================
   GENRE FILTER
========================================================= */
function populateGenreFilter() {
    const select =document.getElementById("genre-filter");
    if (!select) {
        return;
    }
    select.innerHTML = `
        <option value="all">
            All Genres
        </option>
        ${
            allCategories.map(category => {
                return `
                    <option
                        value="${category.id}"
                    >
                        ${category.name}
                    </option>
                `;
            }).join("")
        }
    `;
}
/* =========================================================
   SIDEBAR GENRES
========================================================= */
function populateSidebarGenres() {
    const container =document.getElementById("sidebar-genres");
    if (!container) {
        return;
    }
    container.innerHTML = `
        <li>
            <a href="movie.html">
                All Genres
            </a>
        </li>
        ${
            allCategories.map(category => {
                return `
                    <li><a href="movie.html?genre=${category.id}">${category.name}</a></li>
                `;
            }).join("")
        }
    `;
}
/* =========================================================
   FILTER EVENTS
========================================================= */
function setupMovieFilters() {
    const searchInput =document.getElementById("movie-search");
    const genreFilter =document.getElementById("genre-filter");
    const sortFilter =document.getElementById("sort-filter");
    if (searchInput) {
        searchInput.addEventListener("input",applyMovieFilters);
    }
    if (genreFilter) {
        genreFilter.addEventListener("change",applyMovieFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener("change",applyMovieFilters);
    }
    /*
        Read genre from URL
    */
    const params =new URLSearchParams(window.location.search);
    const genre =params.get("genre");
    if (genre && genreFilter) {
        genreFilter.value = genre;
        applyMovieFilters();
    }
}
/* =========================================================
   APPLY FILTERS
========================================================= */
function applyMovieFilters() {
    const searchInput =document.getElementById("movie-search");
    const genreFilter =document.getElementById("genre-filter");
    const sortFilter =document.getElementById("sort-filter");
    const searchTerm =searchInput? searchInput.value.trim().toLowerCase():"";
    const genre =genreFilter? genreFilter.value: "all";
    const sort =sortFilter? sortFilter.value: "default";
    let filteredMovies =[...allMovies];
    /*
        SEARCH
    */
    if (searchTerm) {filteredMovies =filteredMovies.filter(movie => {return movie.title.toLowerCase().includes(searchTerm);});
    }
    /*
        GENRE
    */
    if (genre !== "all") {
        const genreId =Number(genre);
        filteredMovies =filteredMovies.filter(movie => {
            const categoryIds = Array.isArray(movie?.category_ids) ? movie.category_ids : [];
            return categoryIds.includes(genreId);
        });
    }
    /*
        SORT
    */
    switch (sort) {
        case "title-asc":filteredMovies.sort((a, b) =>a.title.localeCompare(b.title));break;
        case "title-desc":filteredMovies.sort((a, b) =>b.title.localeCompare(a.title));break;
        case "year-desc":filteredMovies.sort((a, b) =>new Date(b.release_date) -new Date(a.release_date));break;
        case "year-asc":filteredMovies.sort((a, b) =>new Date(a.release_date) -new Date(b.release_date));break;
    }
    const container =document.getElementById("movies-container");
    displayMovies(filteredMovies,container);
    updateMovieCount(filteredMovies.length);
    const noResults =document.getElementById("no-results");
    if (noResults) {
        noResults.classList.toggle("hidden",filteredMovies.length !== 0);
    }
}
/* =========================================================
   COUNT
========================================================= */
function updateMovieCount(count) {
    const element =document.getElementById("movie-count");
    if (!element) {
        return;
    }
    element.textContent =`${count} movie${count !== 1 ? "s" : ""} found`;
}