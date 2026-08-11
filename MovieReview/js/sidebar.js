document.getElementById("sidebar").innerHTML = `
<div class="sidebar">
  <div class="sidebar-section">
    <div class="sidebar-title">BROWSE</div>
    <ul class="sidebar-menu">
      <li><a href="index.html"><span>Home</span></a></li>
      <li><a href="movie.html"><span>Movies</span></a></li>
      <li><a href="tv-show.html"><span>TV Shows</span></a></li>
      <li><a href="#"><span>Top Rated</span></a></li>
      <li><a href="#"><span>Latest</span></a></li>
    </ul>
  </div>
  <div class="sidebar-section">
    <div class="sidebar-title">GENRES</div>
    <ul id="sidebar-genres" class="sidebar-menu">
      <li><a href="movie.html">All Genres</a></li>
    </ul>
  </div>
</div>`;

highlightActiveSidebarLink();

function highlightActiveSidebarLink() {
  const path = window.location.pathname.toLowerCase();
  const page = path.substring(path.lastIndexOf('/') + 1);

  document.querySelectorAll('#sidebar .sidebar-menu a').forEach(link => {
    const href = link.getAttribute('href');
    const isActive =
      href === page ||
      (href === 'index.html' && (page === '' || page === 'index.html'));

    if (isActive) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
} 
