fetch("./data/data.json")
  .then(res => res.json())
  .then(data => {
    const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favSongs = data.songs.filter(song => favIds.includes(song.id));
    renderFavorites(favSongs);
  });

function renderFavorites(list) {
  const div = document.getElementById("favorites");
  if (!div) return;

  div.innerHTML = "";

  if (list.length === 0) {
    div.innerHTML = "<p>Chưa có bài nào được yêu thích.</p>";
    return;
  }

  list.forEach(song => {
    div.innerHTML += `
      <div class="card">
        <a href="song.html?id=${song.id}">
          <h3>${song.title}</h3>
        </a>
      </div>
    `;
  });
}
