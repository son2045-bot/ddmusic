// Lấy id bài hát từ URL, ví dụ: song.html?id=1
const params = new URLSearchParams(window.location.search);
const songId = params.get("id");

fetch("data/data.json")
  .then(res => res.json())
  .then(data => {
    const song = data.find(s => s.id == songId);

    if (!song) {
      document.body.innerHTML = "<h2>Không tìm thấy bài nhạc</h2>";
      return;
    }

    document.getElementById("song-title").textContent = song.title;
    document.getElementById("song-artist").textContent = song.artist;

    document.getElementById("player").innerHTML = `
      <iframe
        src="${song.telegram}"
        width="100%"
        height="120"
        frameborder="0"
        allow="autoplay">
      </iframe>
    `;
  });
