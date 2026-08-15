function getStoredMovieReviews() {
    const storedReviews = localStorage.getItem("movieReviews");
    if (!storedReviews) {
        return [];
    }

    try {
        const parsed = JSON.parse(storedReviews);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Unable to read stored reviews:", error);
        return [];
    }
}

function calculateAverageRating(reviews) {
    if (!reviews.length) {
        return 0;
    }

    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    return Number((total / reviews.length).toFixed(1));
}

function getTopRatedMovies(movies, allReviews) {
    return movies
        .map((movie) => {
            const movieReviews = allReviews.filter((review) => Number(review.movie_id) === Number(movie.id));
            return {
                ...movie,
                averageRating: calculateAverageRating(movieReviews),
                reviewCount: movieReviews.length
            };
        })
        .sort((a, b) => {
            if (b.averageRating !== a.averageRating) {
                return b.averageRating - a.averageRating;
            }
            if (b.reviewCount !== a.reviewCount) {
                return b.reviewCount - a.reviewCount;
            }
            return a.title.localeCompare(b.title);
        });
}

function getTopRatedGenreOptions(categories) {
    const select = document.getElementById("top-rated-genre-filter");
    if (!select) {
        return;
    }

    select.innerHTML = `
        <option value="all">All Genres</option>
        ${categories.map((category) => `
            <option value="${category.id}">${category.name}</option>
        `).join("")}
    `;
}

function createTopRatedCard(movie, index) {
    const year = movie.release_date ? movie.release_date.substring(0, 4) : "";
    const stars = Array.from({ length: 5 }, (_, starIndex) =>
        starIndex < Math.round(movie.averageRating) ? "★" : "☆"
    ).join("");

    return `
        <article class="movie-card top-rated-card">
            <div class="top-rated-rank">#${index + 1}</div>
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

                    <div class="top-rated-score">
                        <span class="top-rated-stars">${stars}</span>
                        <span>${movie.averageRating.toFixed(1)}</span>
                    </div>

                    <p class="movie-card-description">
                        ${movie.short_description || movie.description}
                    </p>
                    <p class="movie-card-meta">
                        ${movie.reviewCount} review${movie.reviewCount === 1 ? "" : "s"}
                    </p>
                </div>
            </a>
        </article>
    `;
}

function applyTopRatedFilters(rankedMovies) {
    const searchInput = document.getElementById("top-rated-search");
    const genreFilter = document.getElementById("top-rated-genre-filter");
    const sortFilter = document.getElementById("top-rated-sort-filter");
    const noResults = document.getElementById("top-rated-no-results");

    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const genre = genreFilter ? genreFilter.value : "all";
    const sort = sortFilter ? sortFilter.value : "rating-desc";

    let filteredMovies = [...rankedMovies];

    if (searchTerm) {
        filteredMovies = filteredMovies.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm)
        );
    }

    if (genre !== "all") {
        const genreId = Number(genre);
        filteredMovies = filteredMovies.filter((movie) =>
            (movie.category_ids || []).includes(genreId)
        );
    }

    switch (sort) {
        case "rating-asc":
            filteredMovies.sort((a, b) => a.averageRating - b.averageRating);
            break;
        case "reviews-desc":
            filteredMovies.sort((a, b) => b.reviewCount - a.reviewCount || b.averageRating - a.averageRating);
            break;
        case "title-asc":
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "title-desc":
            filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            filteredMovies.sort((a, b) => {
                if (b.averageRating !== a.averageRating) {
                    return b.averageRating - a.averageRating;
                }
                if (b.reviewCount !== a.reviewCount) {
                    return b.reviewCount - a.reviewCount;
                }
                return a.title.localeCompare(b.title);
            });
            break;
    }

    const container = document.getElementById("top-rated-container");
    if (container) {
        container.innerHTML = filteredMovies
            .map((movie, index) => createTopRatedCard(movie, index))
            .join("");
    }

    if (noResults) {
        noResults.classList.toggle("hidden", filteredMovies.length !== 0);
    }

    const countElement = document.getElementById("top-rated-count");
    if (countElement) {
        countElement.textContent = String(filteredMovies.length);
    }
}

function renderTopRatedMovies(movies, reviews, allCategories) {
    const container = document.getElementById("top-rated-container");
    const countElement = document.getElementById("top-rated-count");
    const reviewedElement = document.getElementById("top-rated-reviewed");
    const totalReviewsElement = document.getElementById("top-rated-total-reviews");

    if (!container) {
        return;
    }

    if (allCategories?.length) {
        getTopRatedGenreOptions(allCategories);
    }

    const searchInput = document.getElementById("top-rated-search");
    const genreFilter = document.getElementById("top-rated-genre-filter");
    const sortFilter = document.getElementById("top-rated-sort-filter");

    if (searchInput) {
        searchInput.addEventListener("input", () => applyTopRatedFilters(movies));
    }
    if (genreFilter) {
        genreFilter.addEventListener("change", () => applyTopRatedFilters(movies));
    }
    if (sortFilter) {
        sortFilter.addEventListener("change", () => applyTopRatedFilters(movies));
    }

    applyTopRatedFilters(movies);

    if (countElement) {
        countElement.textContent = String(movies.length);
    }

    if (reviewedElement) {
        const reviewedCount = movies.filter((movie) => movie.reviewCount > 0).length;
        reviewedElement.textContent = String(reviewedCount);
    }

    if (totalReviewsElement) {
        totalReviewsElement.textContent = String(reviews.length);
    }
}

async function loadTopRatedMovies() {
    const container = document.getElementById("top-rated-container");
    if (!container) {
        return;
    }

    try {
        const [movieResponse, categoryResponse, reviewResponse] = await Promise.all([
            fetch("data/movie.json"),
            fetch("data/category.json"),
            fetch("data/review.json")
        ]);

        if (!movieResponse.ok) {
            throw new Error("Unable to load movie data.");
        }

        if (!categoryResponse.ok) {
            throw new Error("Unable to load category data.");
        }

        if (!reviewResponse.ok) {
            throw new Error("Unable to load review data.");
        }

        const movies = await movieResponse.json();
        const categories = await categoryResponse.json();
        const staticReviews = await reviewResponse.json();
        const storedReviews = getStoredMovieReviews();
        const allReviews = [...staticReviews, ...storedReviews];
        const rankedMovies = getTopRatedMovies(movies, allReviews);

        renderTopRatedMovies(rankedMovies, allReviews, categories);
    } catch (error) {
        console.error("Top-rated movies failed to load:", error);
        container.innerHTML = '<p class="no-results">Unable to load top-rated movies.</p>';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof loadTopRatedMovies === "function") {
        loadTopRatedMovies();
    }
});
