document.getElementById("sidebar").innerHTML = `
<div class="sidebar">
  <div class="sidebar-section">
    <div class="sidebar-title">BROWSE</div>
    <ul class="sidebar-menu">
      <li><a href="index.html"><span>Home</span></a></li>
      <li><a href="movie.html" class="active"><span>Movies</span></a></li>
      <li><a href="#"><span>TV Shows</span></a></li>
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
