let currentMode="nethpot";
let cart=[];
let players=[];

window.onload=()=>{
  loadData();
  renderPacks();
  document.getElementById("preloader").style.display="none";
  navigator.serviceWorker.register("sw.js");
};

async function loadData(){
  const res=await fetch("data.json");
  players=await res.json();
  render();
}

function switchMode(m){
  currentMode=m;
  render();
}

/* RENDER */
function render(){
  const container=document.getElementById("leaderboard");
  container.innerHTML="";

  let list=players[currentMode];

  list.sort((a,b)=>b.elo-a.elo);

  list.forEach(p=>{
    const tier=getTier(p.elo);

    const div=document.createElement("div");
    div.className=`player ${tier.toLowerCase()}`;
    div.innerHTML=`
      <img src="https://minotar.net/avatar/${p.name}/50">
      ${p.name} (${p.elo}) - ${tier}
      <button onclick="addToCart('${p.name}')">+</button>
    `;
    container.appendChild(div);
  });
}

/* ELO */
function getTier(e){
  if(e>=2000)return"HT1";
  if(e>=1800)return"LT1";
  if(e>=1600)return"HT2";
  if(e>=1400)return"LT2";
  if(e>=1200)return"HT3";
  if(e>=1000)return"LT3";
  if(e>=800)return"HT4";
  if(e>=600)return"LT4";
  if(e>=400)return"HT5";
  return"LT5";
}

/* SEARCH */
document.getElementById("search").oninput=e=>{
  const val=e.target.value.toLowerCase();
  document.querySelectorAll(".player").forEach(p=>{
    p.style.display=p.innerText.toLowerCase().includes(val)?"flex":"none";
  });
};

/* CART */
function addToCart(name){
  cart.push({name,price:100});
  updateCart();
}
function updateCart(){
  document.getElementById("cartCount").innerText=cart.length;
  let total=0;
  let html="";
  cart.forEach(i=>{
    total+=i.price;
    html+=`<p>${i.name} ₹${i.price}</p>`;
  });
  document.getElementById("cartItems").innerHTML=html;
  document.getElementById("cartTotal").innerText=total;
}
function toggleCart(){
  document.getElementById("cartModal").classList.toggle("show");
}

/* ADMIN */
async function addPlayer(){
  const name=document.getElementById("playerName").value;
  const elo=parseInt(document.getElementById("playerElo").value);

  await addDoc(collection(db,currentMode),{name,elo});
}

/* MOBILE */
menuBtn.onclick=()=>{
  const sb=document.getElementById("sidebar");
  sb.style.transform=sb.style.transform==="translateX(0px)"?"translateX(-100%)":"translateX(0)";
};

/* PACKS */
const packs=[
{name:"Nebula 32x",res:"32x",downloads:1200},
{name:"Obsidian 64x",res:"64x",downloads:980},
{name:"Ultra PvP 128x",res:"128x",downloads:500}
];

function renderPacks(){
  const grid=document.getElementById("packGrid");
  packs.forEach(p=>{
    grid.innerHTML+=`
      <div class="pack">
        <h3>${p.name}</h3>
        <p>${p.res}</p>
        <p>⬇ ${p.downloads}</p>
      </div>
    `;
  });
}