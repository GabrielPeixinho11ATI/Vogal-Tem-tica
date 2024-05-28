document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('button');
    startButton.addEventListener('click', startGame);
});

let timerInterval;

const words = ["cantar", "bater", "abrir", "metro", "azeite", "fazer", "dançar", "viajar", "ônibus", "pular", "pedra", "cozinhar", "urubu", "observar", "abutre", "palito", "casa", "fechar", "limpar", "pneumoultramicroscopicossilicovulcanoconiótico"];
let currentIndex = 0;

function startGame(manualStart = true) {
    currentIndex = 0;
    movePlayerToStart('player1');
    displayWord();
    displayOptions();
    startTimer(); // Inicia o temporizador quando o jogo começa
    if (manualStart) {
        hideStartButton(); // Oculta o botão "Iniciar Jogo" apenas se for um início manual
    }
}


function hideStartButton() {
    const startButton = document.querySelector('.start-button');
    startButton.style.display = 'none';
}

function movePlayerToStart(playerId) {
    const player = document.getElementById(playerId);
    player.style.left = '0';
}

function displayWord() {
    const wordDiv = document.getElementById('word');
    wordDiv.textContent = words[currentIndex];
}

function displayOptions() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block'; // Mostra as opções

    optionsDiv.innerHTML = '';

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const shuffledVowels = shuffleArray(vowels); // Embaralha o array de vogais

    shuffledVowels.forEach(vowel => {
        const button = document.createElement('button');
        button.textContent = vowel;
        button.onclick = () => checkAnswer(vowel);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedVowel) {
    const word = words[currentIndex];
    const lastVowelIndex = getLastVowelIndex(word);

    if (lastVowelIndex !== -1 && selectedVowel === word.charAt(lastVowelIndex)) {
        movePlayer('player1', 30);
        currentIndex++;
        if (currentIndex >= words.length) {
            alert('Parabéns! Você venceu!');
            startGame();
        } else {
            displayWord();
            displayOptions();
        }
    } else {
        alert('Resposta incorreta. Tente novamente.');
    }
}

function getLastVowelIndex(word) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let i = word.length - 1; i >= 0; i--) {
        if (vowels.includes(word.charAt(i))) {
            return i;
        }
    }
    return -1;
}

function movePlayer(playerId, duration) {
    const player = document.getElementById(playerId);
    const track = document.querySelector('.track');
    const trackWidth = track.offsetWidth;
    const playerWidth = player.offsetWidth;
    const moveAmount = trackWidth / duration;
    const currentPosition = parseInt(player.style.left) || 0;
    const newPosition = currentPosition + moveAmount;
    player.style.left = `${newPosition}px`;
}

function startTimer() {
    let seconds = 30;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Tempo: ${seconds}s`;

    timerInterval = setInterval(() => {
        seconds--;
        timerElement.textContent = `Tempo: ${seconds}s`;

        if (seconds === 0) {
            clearInterval(timerInterval);
            alert('Tempo esgotado! A página será recarregada.');
            location.reload(); // Recarrega a página quando o tempo esgotar
        }
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectVehicle(vehicleUrl) {
    const vehicleSelection = document.querySelector('.vehicle-selection');
    vehicleSelection.style.display = 'none'; // Oculta a seleção de veículo
    const container = document.querySelector('.container');
    container.style.display = 'block'; // Exibe o jogo
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.style.display = 'block'; // Exibe o temporizador
    const player = document.getElementById('player1');
    player.style.backgroundImage = `url('${vehicleUrl}')`; // Define a imagem do carro selecionado
    
    // Remover os botões de iniciar jogo
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.parentNode.removeChild(startButton);
    }
    
    if (vehicleUrl !== 'URL_DO_CARRO_2') {
        startGame(false); // Inicia o jogo automaticamente, exceto para a opção 2
    }
}