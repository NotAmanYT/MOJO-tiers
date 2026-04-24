let data = {};
let currentMode = "nethpot";

window.onload = () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 500);

  fetchData();
};

async function fetchData() {
  const res = await fetch("data.json");
  data = await res.json();
  render();
}

function loadMode(mode) {
  currentMode = mode;
  render();
}

function render() {
  const container = document.getElementById("tiersContainer");
  container.innerHTML = "";

  const tiers = data[currentMode];

  const order = ["HT1","LT1","HT2","LT2","HT3","LT3","HT4","LT4","HT5","LT5"];

  order.forEach(tier => {
    tiers[tier].forEach(player => {
      const card = document.createElement("div");
      card.className = `card ${tier.toLowerCase()}`;

      card.innerHTML = `
        <div class="card-left">
          <img src="https://crafatar.com/avatars/${player.uuid}?size=64&overlay">
          <div>
            <strong>${player.name}</strong><br>
            <small>${tier}</small>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  });
}

/* SEARCH */
document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(val) ? "flex" : "none";
  });
});

/* MOBILE MENU */
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("sidebar").classList.toggle("active");
};
