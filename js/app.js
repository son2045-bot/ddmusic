console.log("app.js đã chạy");

let allSongs = [];

fetch("data/data.json")
  .then(r => r.json())
  .then(data => {
    allSongs = data.songs;
    render(allSongs);
  });

function render(list) {
  const div = document.getElementById("playlist");
  div.innerHTML = "";
  list.forEach(s => {
    div.innerHTML += `
      <div class="card">
        <h3>${s.title}</h3>
        <p>${s.artist}</p>
        <a href="song.html?id=${s.id}">▶ Nghe</a>
        <button onclick="toggleFav(${s.id})">${isFav(s.id) ? "❤️" : "🤍"}</button>
      </div>
    `;
  });
}

function toggleFav(id) {
  let fav = JSON.parse(localStorage.getItem("fav") || "[]");
  fav = fav.includes(id) ? fav.filter(x => x !== id) : [...fav, id];
  localStorage.setItem("fav", JSON.stringify(fav));
  render(allSongs);
}

function isFav(id) {
  return JSON.parse(localStorage.getItem("fav") || "[]").includes(id);
}

document.getElementById("search").addEventListener("input", e => {
  const k = e.target.value.toLowerCase();
  render(allSongs.filter(s => s.title.toLowerCase().includes(k)));
});
