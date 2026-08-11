async function loadMovieDetail() {
    const container = document.getElementById("movie-detail");
    if (!container) {
        return;
    }

    try {
        const params = new URLSearchParams(window.location.search);
        const movieId = Number.parseInt(params.get("id"), 10);
        if (!Number.isInteger(movieId) || movieId <= 0) {
            showMovieError(container, "Movie ID was not provided.");
            return;
        }
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
        const reviews = await reviewResponse.json();
        const movie = movies.find((item) => item.id === movieId);
        if (!movie) {
            showMovieError(container, "Movie not found.");
            return;
        }
        displayMovieDetail(container, movie, categories, reviews);
    } catch (error) {
        console.error("Movie detail load failed:", error);
        showMovieError(container, "Unable to load movie.");
    }
}

/* =========================================================
   DISPLAY DETAIL
========================================================= */
function displayMovieDetail(container, movie, categories, reviews) {
    const movieCategories = categories.filter((category) =>
        movie.category_ids?.includes(category.id)
    );
    const movieReviews = reviews.filter((review) => review.movie_id === movie.id);
    const averageRating = calculateAverageRating(movieReviews);
    const year = movie.release_date ? movie.release_date.substring(0, 4) : "";
    const heroBackground = movie.backdrop || movie.poster || "";

    document.title = `MovieReview - ${movie.title}`;

    container.innerHTML = `
        <section class="movie-detail-hero" style="background-image: linear-gradient(rgba(17,17,17,0.7), rgba(17,17,17,0.9)), url('${heroBackground}'); background-size: cover; background-position: center;">
            <div class="movie-detail-content">
                <img class="detail-poster" src="${movie.poster}" alt="${movie.title}" loading="eager">

                <div class="detail-info">
                    <span class="section-label">${movie.type}</span>
                    <h1>${movie.title}</h1>

                    <div class="detail-meta">
                        ${year ? `<span class="meta-item">${year}</span>` : ""}
                        <span class="meta-item">${movie.runtime_minutes} minutes</span>
                        <span class="meta-item">${movie.status}</span>
                    </div>

                    <div class="rating">⭐ ${averageRating}</div>
                    <p class="detail-description">${movie.description}</p>

                    <div class="detail-meta">
                        ${movieCategories.length
                            ? movieCategories.map((category) => `
                                <span class="meta-item">${category.name}</span>
                            `).join("")
                            : '<span class="meta-item">General</span>'}
                    </div>
                </div>
            </div>
        </section>

        <section class="reviews-section">
            <h2>Reviews</h2>
            ${movieReviews.length
                ? movieReviews.map((review) => createReviewCard(review)).join("")
                : '<p>No reviews yet.</p>'}
        </section>
    `;
}

/* =========================================================
   REVIEW CARD
========================================================= */
function createReviewCard(review) {
    const reviewDate = review.created_at ? new Date(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    }) : "Recently";

    return `
        <article class="review-card">
            <div class="review-header">
                <div>
                    <div class="reviewer">${review.username}</div>
                    <div class="review-date">${reviewDate}</div>
                </div>

                <div class="review-rating" aria-label="${review.rating} out of 5 stars">
                    ${"★".repeat(review.rating)}${"☆".repeat(Math.max(0, 5 - review.rating))}
                </div>
            </div>

            <h3>${review.title}</h3>
            <p>${review.review}</p>
        </article>
    `;
}

/* =========================================================
   AVERAGE RATING
========================================================= */
function calculateAverageRating(reviews) {
    if (!reviews.length) {
        return "No rating";
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
}

/* =========================================================
   ERROR
========================================================= */
function showMovieError(container, message) {
    container.innerHTML = `
        <div class="loading">
            <h2>${message}</h2>
            <p><a href="movie.html">← Back to Movies</a></p>
        </div>
    `;
}

/* =========================================================
   START
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof loadMovieDetail === "function") {
        loadMovieDetail();
    }
});