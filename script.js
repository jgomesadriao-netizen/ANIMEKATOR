document.addEventListener("DOMContentLoaded", function () {
    // PERSONAGENS
    const characters = [
        { id: 1, name: "Naruto", image: "img/naruto.jpg.jpeg" },
        { id: 2, name: "Luffy", image: "img/luffy.jpg.jpeg" },
        { id: 3, name: "Goku", image: "img/goku.jpg.jpeg" },
        { id: 4, name: "Gojo", image: "img/gojo.jpg.jpeg" },
        { id: 5, name: "Tanjiro", image: "img/tanjiro.jpg.jpeg" },
        { id: 6, name: "Zoro", image: "img/zoro.jpg.jpeg" },
        { id: 7, name: "Ichigo", image: "img/ichiro.jpg.jpeg" },
        { id: 8, name: "Eren", image: "img/eren.jpg.jpeg" },
        { id: 9, name: "Killua", image: "img/killua.jpg.jpeg" },
        { id: 10, name: "Deku", image: "img/deku.jpg.jpeg" },
        { id: 11, name: "Saitama", image: "img/saitama.jpg.jpeg" },
        { id: 12, name: "Nezuko", image: "img/nezuko.jpg.jpeg" },
        { id: 13, name: "Sukuna", image: "img/sukuna.jpg.jpeg" },
        { id: 14, name: "Gon", image: "img/gon.jpg.jpeg" },
        { id: 15, name: "Vegeta", image: "img/vegeta.jpg.jpeg" }
    ];

    // QUATRO CARTAS DO ANIMEKATOR
    // Vegeta aparece nas quatro posições combinadas.
    const cards = [
        { value: 1, characters: [15, 3, 5, 7, 9, 11, 13, 1] },
        { value: 2, characters: [2, 15, 6, 7, 10, 11, 14, 3] },
        { value: 4, characters: [4, 5, 6, 7, 12, 13, 14, 15] },
        { value: 8, characters: [8, 9, 10, 15, 11, 12, 13, 14] }
    ];

    // ELEMENTOS DA PÁGINA
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const resultScreen = document.getElementById("result-screen");

    const startButton = document.getElementById("start-button");
    const cardDisplay = document.getElementById("card-display");
    const questionText = document.getElementById("question-text");
    const answerButtons = document.querySelectorAll("[data-answer]");

    const resultNumber = document.getElementById("result-number");
    const resultImage = document.getElementById("result-image");
    const explanationText = document.getElementById("explanation-text");
    const playAgainButton = document.getElementById("play-again-button");

    // ESTADO DO JOGO
    let currentCard = 0;
    let guessedNumber = 0;

    // TROCAR DE TELA
    function showScreen(screen) {
        startScreen.classList.remove("active");
        gameScreen.classList.remove("active");
        resultScreen.classList.remove("active");

        screen.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // COMEÇAR OU RECOMEÇAR
    function startGame() {
        currentCard = 0;
        guessedNumber = 0;

        showScreen(gameScreen);
        showCard();
    }

    // MOSTRAR A CARTA ATUAL
    function showCard() {
        if (currentCard >= cards.length) {
            showResult();
            return;
        }

        const card = cards[currentCard];

        questionText.textContent =
            "O personagem que você escolheu está nesta carta? 👀";

        cardDisplay.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = `Carta ${currentCard + 1} de ${cards.length}`;
        cardDisplay.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "characters-grid";

        card.characters.forEach(function (id) {
            const character = characters.find(function (item) {
                return item.id === id;
            });

            if (!character) return;

            const box = document.createElement("div");
            box.className = "character";

            const img = document.createElement("img");
            img.src = character.image;
            img.alt = character.name;
            img.onerror = function () {
                this.alt = "Imagem indisponível";
            };

            const name = document.createElement("p");
            name.textContent = character.name;

            box.appendChild(img);
            box.appendChild(name);
            grid.appendChild(box);
        });

        cardDisplay.appendChild(grid);
    }

    // REGISTRAR RESPOSTA
    function handleAnswer(answer) {
        if (answer === "yes") {
            guessedNumber += cards[currentCard].value;
        }

        currentCard++;
        showCard();
    }

    // MOSTRAR RESULTADO
    function showResult() {
        showScreen(resultScreen);

        const character = characters.find(function (item) {
            return item.id === guessedNumber;
        });

        if (!character) {
            resultNumber.textContent = "OPA! 🤨";

            resultImage.innerHTML = `
                <div style="font-size: 85px; margin: 20px;">
                    🕵️‍♂️
                </div>
            `;

            explanationText.textContent =
                "KKKKKK tentou me passar a perna, né, meu consagrado? 😂 " +
                "Você respondeu tudo no modo aleatório e quer que eu leia sua mente? " +
                "Aí você me quebra! Escolhe um personagem e tenta de novo, Sherlock de Taubaté! 🕵️";

            return;
        }

        resultNumber.textContent =
            `Seu personagem é o número ${character.id}!`;

        resultImage.innerHTML = "";

        const img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;
        img.style.width = "100%";
        img.style.maxWidth = "280px";
        img.style.borderRadius = "20px";

        resultImage.appendChild(img);

        explanationText.textContent =
            `KKKKK te peguei! 😂 Seu personagem é ${character.name}! ` +
            `O número dele é ${guessedNumber}. Não é magia, meu parceiro: ` +
            "é matemática disfarçada de fofoca! 🧠";
    }

    // BOTÃO COMEÇAR
    if (startButton) {
        startButton.addEventListener("click", startGame);
    }

    // BOTÕES SIM E NÃO
    answerButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            handleAnswer(button.dataset.answer);
        });
    });

    // BOTÃO JOGAR NOVAMENTE
    if (playAgainButton) {
        playAgainButton.addEventListener("click", function () {
            showScreen(startScreen);
        });
    }
});
