const id = new URLSearchParams(location.search).get("id");

fetch("data/data.json")
  .then(r => r.json())
  .then(data => {
    const song = data.songs.find(s => s.id == id);
    if (!song) return;

    document.getElementById("title").innerText = song.title;

    document.getElementById("player").innerHTML = `
      <iframe
        src="${song.telegram}?embed=1"
        width="100%"
        height="120"
        frameborder="0"
        allow="autoplay">
      </iframe>
    `;

    saveRecent(song.id);
  });

function saveRecent(id) {
  let recent = JSON.parse(localStorage.getItem("recent") || "[]");
  recent = [id, ...recent.filter(x => x !== id)].slice(0, 5);
  localStorage.setItem("recent", JSON.stringify(recent));
}
