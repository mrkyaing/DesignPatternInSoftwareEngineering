let tvShows = [];
let allCategories = [];

async function loadTvShows() {
    try {
        const tvResponse = await fetch('../data/movie.json');
        const categoryResponse = await fetch('../data/category.json');

        if (!tvResponse.ok) {
            throw new Error('Unable to load movie.json');
        }
        if (!categoryResponse.ok) {
            throw new Error('Unable to load category.json');
        }

        const allItems = await tvResponse.json();
        allCategories = await categoryResponse.json();
        const tvTypes = ['tv', 'tv show', 'series'];
        tvShows = allItems.filter(item => {
            const type = item.type ? item.type.toLowerCase().trim() : '';
            return tvTypes.includes(type);
        });

        initializeTvPage();
    } catch (error) {
        console.error(error);
    }
}

function initializeTvPage() {
    const tvListContainer = document.getElementById('tv-shows-container');

    if (tvListContainer) {
        populateGenreFilter();
        displayTvShows(tvShows, tvListContainer);
        updateTvShowCount(tvShows.length);
        setupTvFilters();
    }

    populateSidebarGenres();
}

function displayTvShows(shows, container) {
    if (!container) {
        return;
    }

    container.innerHTML = shows.map(show => createTvCard(show)).join('');
}

function createTvCard(show) {
    const year = show.release_date ? show.release_date.substring(0, 4) : '';
    return `
        <article class="movie-card">
            <a href="movie-detail.html?id=${show.id}">
                <div class="movie-poster-wrapper">
                    <img
                        class="movie-poster"
                        src="${show.poster}"
                        alt="${show.title}"
                        loading="lazy"
                    >
                    <span class="movie-type">${show.type}</span>
                </div>
                <div class="movie-card-content">
                    <h3>${show.title}</h3>
                    <div class="movie-card-meta">
                        <span>${year}</span>
                        <span>•</span>
                        <span>${show.runtime_minutes} min</span>
                    </div>
                    <p class="movie-card-description">${show.short_description}</p>
                </div>
            </a>
        </article>
    `;
}

function populateGenreFilter() {
    const select = document.getElementById('genre-filter');
    if (!select) {
        return;
    }

    select.innerHTML = `
        <option value="all">All Genres</option>
        ${allCategories.map(category => `
            <option value="${category.id}">${category.name}</option>
        `).join('')}
    `;
}

function populateSidebarGenres() {
    const container = document.getElementById('sidebar-genres');
    if (!container) {
        return;
    }

    container.innerHTML = `
        <li>
            <a href="tv-show.html">All Genres</a>
        </li>
        ${allCategories.map(category => `
            <li>
                <a href="tv-show.html?genre=${category.id}">${category.name}</a>
            </li>
        `).join('')}
    `;
}

function setupTvFilters() {
    const searchInput = document.getElementById('movie-search');
    const genreFilter = document.getElementById('genre-filter');
    const sortFilter = document.getElementById('sort-filter');

    if (searchInput) {
        searchInput.addEventListener('input', applyTvFilters);
    }
    if (genreFilter) {
        genreFilter.addEventListener('change', applyTvFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applyTvFilters);
    }

    const params = new URLSearchParams(window.location.search);
    const genre = params.get('genre');
    if (genre && genreFilter) {
        genreFilter.value = genre;
        applyTvFilters();
    }
}

function applyTvFilters() {
    const searchInput = document.getElementById('movie-search');
    const genreFilter = document.getElementById('genre-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const genre = genreFilter ? genreFilter.value : 'all';
    const sort = sortFilter ? sortFilter.value : 'default';

    let filteredShows = [...tvShows];

    if (searchTerm) {
        filteredShows = filteredShows.filter(show => show.title.toLowerCase().includes(searchTerm));
    }

    if (genre !== 'all') {
        const genreId = Number(genre);
        filteredShows = filteredShows.filter(show => show.category_ids.includes(genreId));
    }

    switch (sort) {
        case 'title-asc':
            filteredShows.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredShows.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'year-desc':
            filteredShows.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            break;
        case 'year-asc':
            filteredShows.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            break;
    }

    const container = document.getElementById('tv-shows-container');
    displayTvShows(filteredShows, container);
    updateTvShowCount(filteredShows.length);

    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.classList.toggle('hidden', filteredShows.length !== 0);
    }
}

function updateTvShowCount(count) {
    const element = document.getElementById('tv-show-count');
    if (!element) {
        return;
    }
    element.textContent = `${count} TV show${count !== 1 ? 's' : ''} found`;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTvShows);
} else {
    loadTvShows();
}
