let allSongs = [];
let currentMood = "all";

fetch("data/data.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data.songs;
    render(allSongs);
    renderRecent();
    renderFavorites();
  });

function render(list) {
  const div = document.getElementById("playlist");
  if(!div) return;
  div.innerHTML = "";
  list.forEach(song => {
    const fav = isFav(song.id) ? "❤️" : "🤍";
    div.innerHTML += `
      <div class="card">
        <a href="song.html?id=${song.id}"><h3>${song.title}</h3></a>
        <button onclick="toggleFav(${song.id})">${fav}</button>
      </div>
    `;
  });
}

function filterMood(mood){ currentMood=mood; applyFilter(); }
document.getElementById("search")?.addEventListener("input",applyFilter);

function applyFilter(){
  const key=document.getElementById("search")?.value.toLowerCase()||"";
  let list=allSongs.filter(s=>s.title.toLowerCase().includes(key));
  if(currentMood!=="all") list=list.filter(s=>s.mood===currentMood);
  render(list);
}

function toggleFav(id){
  let favs=JSON.parse(localStorage.getItem("favs"))||[];
  favs=favs.includes(id)?favs.filter(f=>f!==id):[...favs,id];
  localStorage.setItem("favs",JSON.stringify(favs));
  applyFilter();
}
function isFav(id){ return (JSON.parse(localStorage.getItem("favs"))||[]).includes(id); }

function saveRecent(song){
  let recent=JSON.parse(localStorage.getItem("recent"))||[];
  recent=recent.filter(s=>s.id!==song.id);
  recent.unshift(song);
  if(recent.length>5) recent.pop();
  localStorage.setItem("recent",JSON.stringify(recent));
}
function renderRecent(){
  const div=document.getElementById("recent");
  if(!div) return;
  const recent=JSON.parse(localStorage.getItem("recent"))||[];
  div.innerHTML="";
  recent.forEach(song=>{ div.innerHTML+=`<a class="card" href="song.html?id=${song.id}"><h3>${song.title}</h3></a>`; });
}
function renderFavorites(){
  const div=document.getElementById("playlist");
  if(!div) return;
  const favs=JSON.parse(localStorage.getItem("favs"))||[];
  const list=allSongs.filter(s=>favs.includes(s.id));
  render(list);
}
function toggleTheme(){ document.body.classList.toggle("light"); }

function decodeTG(str){ return atob(str); }
const params=new URLSearchParams(window.location.search);
const id=params.get("id");
const song=allSongs.find(s=>s.id==id);
if(song){
  document.getElementById("title")?.innerText=song.title;
  saveRecent(song);
  setTimeout(()=>{
    document.getElementById("player")?.innerHTML=`
      <script async src="https://telegram.org/js/telegram-widget.js?22"
      data-telegram-post="${decodeTG(song.tg)}" data-width="100%"></script>`;
  },2500);
}
