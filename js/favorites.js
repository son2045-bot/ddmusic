fetch("data/data.json")
  .then(r => r.json())
  .then(data => {
    const fav = JSON.parse(localStorage.getItem("fav") || "[]");
    const list = data.songs.filter(s => fav.includes(s.id));
    const div = document.getElementById("favorites");
    div.innerHTML = list.length ? "" : "Chưa có bài nào";

    list.forEach(s => {
      div.innerHTML += `
        <div class="card">
          <h3>${s.title}</h3>
          <a href="song.html?id=${s.id}">▶ Nghe</a>
        </div>
      `;
    });
  });
