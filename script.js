// ==========================================
// ANIMEKATOR
// JOGO DE ADIVINHAÇÃO DE PERSONAGENS
// ==========================================


// ==========================================
// PERSONAGENS
// ==========================================

const characters = [
    {
        id: 1,
        name: "Naruto",
        image: "img/naruto.jpg"
    },
    {
        id: 2,
        name: "Luffy",
        image: "img/luffy.jpg"
    },
    {
        id: 3,
        name: "Goku",
        image: "img/goku.jpg"
    },
    {
        id: 4,
        name: "Gojo",
        image: "img/gojo.jpg"
    },
    {
        id: 5,
        name: "Tanjiro",
        image: "img/tanjiro.jpg"
    },
    {
        id: 6,
        name: "Zoro",
        image: "img/zoro.jpg"
    },
    {
        id: 7,
        name: "Ichigo",
        image: "img/ichiro.jpg"
    },
    {
        id: 8,
        name: "Eren",
        image: "img/eren.jpg"
    },
    {
        id: 9,
        name: "Killua",
        image: "img/killua.jpg"
    },
    {
        id: 10,
        name: "Deku",
        image: "img/deku.jpg"
    },
    {
        id: 11,
        name: "Saitama",
        image: "img/saitama.jpg"
    },
    {
        id: 12,
        name: "Nezuko",
        image: "img/nezuko.jpg"
    },
    {
        id: 13,
        name: "Sukuna",
        image: "img/sukuna.jpg"
    },
    {
        id: 14,
        name: "Gon",
        image: "img/gon.jpg"
    },
    {
        // PERSONAGEM Nº 15
        // CARTA CORINGA
        id: 15,
        name: "Vegeta",
        image: "img/vegeta.jpg"
    }
];


// ==========================================
// CARTAS
// ==========================================

// Cada carta representa um valor:
//
// Carta 1 = 1
// Carta 2 = 2
// Carta 3 = 4
// Carta 4 = 8
//
// A soma das cartas em que o personagem
// aparece revela o número dele.
//
// Vegeta = 15
// 1 + 2 + 4 + 8 = 15


const cards = [

    {
        value: 1,

        // VEGETA está na posição 1
        characters: [
            15,
            3,
            5,
            7,
            9,
            11,
            13,
            1
        ]
    },

    {
        value: 2,

        // VEGETA está na posição 2
        characters: [
            2,
            15,
            6,
            7,
            10,
            11,
            14,
            3
        ]
    },

    {
        value: 4,

        // VEGETA está na posição 8
        characters: [
            4,
            5,
            6,
            7,
            12,
            13,
            14,
            15
        ]
    },

    {
        value: 8,

        // VEGETA está na posição 4
        characters: [
            8,
            9,
            10,
            15,
            11,
            12,
            13,
            14
        ]
    }

];


// ==========================================
// VARIÁVEIS DO JOGO
// ==========================================

let currentCard = 0;

let guessedNumber = 0;


// ==========================================
// PEGANDO OS ELEMENTOS DO HTML
// ==========================================

const startScreen = document.getElementById("start-screen");

const gameScreen = document.getElementById("game-screen");

const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");

const cardDisplay = document.getElementById("card-display");

const questionText = document.getElementById("question-text");

const resultNumber = document.getElementById("result-number");

const resultImage = document.getElementById("result-image");

const explanationText = document.getElementById("explanation-text");

const playAgainButton = document.getElementById("play-again-button");


// ==========================================
// TROCAR DE TELA
// ==========================================

function showScreen(screen) {

    startScreen.classList.remove("active");

    gameScreen.classList.remove("active");

    resultScreen.classList.remove("active");

    screen.classList.add("active");
}


// ==========================================
// COMEÇAR O JOGO
// ==========================================

function startGame() {

    currentCard = 0;

    guessedNumber = 0;

    showScreen(gameScreen);

    showCard();
}


// ==========================================
// MOSTRAR UMA CARTA
// ==========================================

function showCard() {

    // Se terminou as 4 cartas
    if (currentCard >= cards.length) {

        showResult();

        return;
    }


    const card = cards[currentCard];


    questionText.textContent =
        `O personagem que você escolheu está nesta carta?`;


    cardDisplay.innerHTML = "";


    // Título da carta

    const title = document.createElement("h2");

    title.textContent =
        `Carta ${currentCard + 1} de ${cards.length}`;

    cardDisplay.appendChild(title);


    // Grid dos personagens

    const grid = document.createElement("div");

    grid.className = "characters-grid";


    // Coloca os personagens da carta

    card.characters.forEach(function(id) {

        const character = characters.find(function(personagem) {

            return personagem.id === id;

        });


        if (!character) {
            return;
        }


        const characterBox = document.createElement("div");

        characterBox.className = "character";


        characterBox.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
        `;


        grid.appendChild(characterBox);

    });


    cardDisplay.appendChild(grid);
}


// ==========================================
// RESPONDER SIM OU NÃO
// ==========================================

function handleAnswer(answer) {

    // Se respondeu SIM
    if (answer === "yes") {

        // Soma o valor da carta
        guessedNumber += cards[currentCard].value;
    }


    // Vai para a próxima carta
    currentCard++;


    showCard();
}


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function showResult() {

    showScreen(resultScreen);


    // Procura o personagem pelo número descoberto

    const character = characters.find(function(personagem) {

        return personagem.id === guessedNumber;

    });


    // Caso aconteça algum erro

    if (!character) {

        resultNumber.textContent = "Ops!";

        resultImage.innerHTML = "";

        explanationText.textContent =
            "Não consegui descobrir o personagem.";

        return;
    }


    // Número descoberto

    resultNumber.textContent =
        `Seu personagem é o número ${guessedNumber}`;


    // Imagem

    resultImage.innerHTML = `
        <img 
            src="${character.image}" 
            alt="${character.name}"
            style="
                width: 100%;
                max-width: 280px;
                border-radius: 20px;
            "
        >
    `;


    // Explicação

    explanationText.textContent =
        `Eu descobri! O personagem escolhido foi ${character.name}. 
        O número dele é ${guessedNumber}, descoberto através da soma 
        das cartas em que ele apareceu.`;
}


// ==========================================
// BOTÃO COMEÇAR
// ==========================================

startButton.addEventListener("click", function() {

    startGame();

});


// ==========================================
// BOTÕES SIM E NÃO
// ==========================================

const answerButtons = document.querySelectorAll(
    "[data-answer]"
);


answerButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const answer = button.getAttribute("data-answer");

        handleAnswer(answer);

    });

});


// ==========================================
// JOGAR NOVAMENTE
// ==========================================

playAgainButton.addEventListener("click", function() {

    startGame();

});
