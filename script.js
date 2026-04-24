document.addEventListener('DOMContentLoaded', () => {
    const tierContainer = document.getElementById('tier-container');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            for (const [tierName, players] of Object.entries(data)) {
                
                const tierSection = document.createElement('div');
                tierSection.classList.add('tier-section');

                const tierHeader = document.createElement('h2');
                tierHeader.textContent = tierName;
                tierSection.appendChild(tierHeader);

                const playerList = document.createElement('div');
                playerList.classList.add('player-list');

                players.forEach(player => {
                    const playerCard = document.createElement('div');
                    playerCard.classList.add('player-card');
                    
                    playerCard.innerHTML = `
                        <img src="https://minotar.net/helm/${player}/50.png" alt="${player}">
                        <span>${player}</span>
                    `;
                    playerList.appendChild(playerCard);
                });

                tierSection.appendChild(playerList);
                tierContainer.appendChild(tierSection);
            }
        })
        .catch(error => console.error('Error:', error));
});
