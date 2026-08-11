document.getElementById("header").innerHTML=`
    <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="logo">Movie Review</a>
            <nav class="main-nav">
                <a href="index.html">Home</a> |
                <a href="movie.html">Movies</a>|
                <a href="tv-show.html">TV Shows</a>|
                <a href="#">Actors</a>|
                <a href="#">Categories</a>
            </nav>
            <div class="header-actions">
                <a href="login.html" class="login-button" id="btnlogin">Login</a>
                <a href="login.html" class="logout-button" id="btnlogout" onclick="logoutAction()">Logout</a>
            </div>
        </div>
    </header>
`

function isUserLoggedIn() {
    return localStorage.getItem('loginUser') !== null;
}

function updateAuthButtons() {
    const btnLogin = document.getElementById('btnlogin');
    const btnLogout = document.getElementById('btnlogout');

    if (!btnLogin || !btnLogout) {
        return;
    }

    if (isUserLoggedIn()) {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
    } else {
        btnLogin.style.display = 'block';
        btnLogout.style.display = 'none';
    }
}

function formLoad() {
    updateAuthButtons();
}

function logoutAction() {
    localStorage.removeItem('loginUser');
    updateAuthButtons();
    window.location.href = 'index.html';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthButtons);
} else {
    updateAuthButtons();
}