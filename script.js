let players = [];
let currentRound = 1;
let totalPlayers = 4; // Valor inicial padrão de jogadores

// Nomes das rodadas
const roundNames = [
    "Mata-Mata",
    "Oitavas de Final",
    "Quartas de Final",
    "Semifinal",
    "Final"
];

// Função para criar campos de entrada de nomes dos jogadores
function createPlayerInputs() {
    const playerInputDiv = document.getElementById('playerInput');
    playerInputDiv.innerHTML = '';

    for (let i = 1; i <= totalPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Nome do Jogador ${i}`;
        input.id = `player${i}`;
        playerInputDiv.appendChild(input);
    }

    // Exibe os campos de entrada de nomes e o botão "Iniciar Torneio"
    playerInputDiv.style.display = 'block';
    document.getElementById('startTournament').style.display = 'block';
}

// Função para obter os nomes dos jogadores
function getPlayerNames() {
    players = [];
    for (let i = 1; i <= totalPlayers; i++) {
        const playerName = document.getElementById(`player${i}`).value.trim();
        if (playerName) {
            players.push(playerName);
        } else {
            players.push(`Jogador ${i}`); // Nome padrão caso não seja inserido
        }
    }
}

function startTournament() {
    getPlayerNames();
    document.getElementById('tournament').innerHTML = '';
    currentRound = 1;
    let currentPlayers = [...players];
    while (currentPlayers.length > 1) {
        currentPlayers = playRound(currentPlayers);
    }
    displayWinner(currentPlayers[0]);
}

function playRound(players) {
    const roundDiv = document.createElement('div');
    roundDiv.className = 'round';
    roundDiv.innerHTML = `<h2>${roundNames[currentRound - 1]}</h2>`;
    document.getElementById('tournament').appendChild(roundDiv);

    const winners = [];
    for (let i = 0; i < players.length; i += 2) {
        const player1 = players[i];
        const player2 = players[i + 1];

        const winner = prompt(`Duelando: ${player1} vs ${player2}\nDigite o vencedor: ${player1} ou ${player2}`);
        winners.push(winner);
        
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match';
        matchDiv.textContent = `${player1} vs ${player2} - Vencedor: ${winner}`;
        roundDiv.appendChild(matchDiv);
    }

    currentRound++;
    return winners;
}

function displayWinner(winner) {
    const winnerDiv = document.createElement('div');
    winnerDiv.innerHTML = `<h2>Vencedor do Torneio: ${winner}</h2>`;
    document.getElementById('tournament').appendChild(winnerDiv);
}

// Evento para confirmar número de jogadores e mostrar os campos de entrada
document.getElementById('confirmPlayers').addEventListener('click', () => {
    totalPlayers = parseInt(document.getElementById('numPlayers').value);
    createPlayerInputs();
});

// Evento para iniciar o torneio
document.getElementById('startTournament').addEventListener('click', startTournament);
