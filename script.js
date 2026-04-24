async function loadTiers(mode) {
    document.getElementById('current-mode-title').innerText = mode + " Tiers";
    const container = document.getElementById('tier-container');
    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch('data.json');
        const allData = await response.json();
        const data = allData[mode];
        container.innerHTML = "";

        // MCTiers Order: HT1 -> LT1 -> HT2 -> LT2...
        const rankOrder = ["HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5"];

        rankOrder.forEach(rank => {
            if (data[rank] && data[rank].length > 0) {
                const row = document.createElement('div');
                row.className = `tier-row rank-${rank}`;
                row.innerHTML = `
                    <div class="rank-label">${rank}</div>
                    <div class="player-grid">
                        ${data[rank].map(p => `
                            <div class="player-tag">
                                <img src="https://minotar.net/helm/${p}/32.png">
                                <span>${p}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(row);
            }
        });
    } catch (e) {
        container.innerHTML = "<p>No data found.</p>";
    }
}
loadTiers('Vanilla');
