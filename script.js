document.addEventListener('DOMContentLoaded', function() {
    const recyclableTrash = document.getElementById('trash-can-recyclable');
    const compostableTrash = document.getElementById('trash-can-compostable');
    const nonRecyclableTrash = document.getElementById('trash-can-non-recyclable');
    const item = document.getElementById('item');
    const scoreDisplay = document.getElementById('score');
    const errorCountDisplay = document.getElementById('error-count');
    const messageDisplay = document.getElementById('message');
    const tryAgainButton = document.getElementById('try-again');

    let score = 0;
    let errorCount = 0;

    // Função para mover o item aleatoriamente na tela
    function moveItem() {
        const randomX = Math.floor(Math.random() * 550) + 25;
        item.style.left = randomX + 'px';
        item.style.top = '0px'; // Resetar a posição vertical
    }

    // Função para mover o item para baixo (simulando a queda)
    function dropItem() {
        const currentTop = parseInt(item.style.top);
        const newTop = currentTop + 5; // Velocidade da queda
        item.style.top = newTop + 'px';
        if (newTop >= 350) { // Se o item atingir a parte inferior do contêiner
            checkDrop();
        } else {
            requestAnimationFrame(dropItem); // Continuar a queda
        }
    }

    // Função para verificar se o item foi descartado corretamente
    function checkDrop() {
        const itemX = item.getBoundingClientRect().left;
        const recyclableX = recyclableTrash.getBoundingClientRect().left;
        const compostableX = compostableTrash.getBoundingClientRect().left;
        const nonRecyclableX = nonRecyclableTrash.getBoundingClientRect().left;
        const tolerance = 50; // Define uma tolerância de 50 pixels para o descarte

        if (Math.abs(itemX - recyclableX) <= tolerance) {
            score++;
            scoreDisplay.textContent = 'Pontuação: ' + score;
            moveItem();
        } else if (Math.abs(itemX - compostableX) <= tolerance) {
            score++;
            scoreDisplay.textContent = 'Pontuação: ' + score;
            moveItem();
        } else if (Math.abs(itemX - nonRecyclableX) <= tolerance) {
            score++;
            scoreDisplay.textContent = 'Pontuação: ' + score;
            moveItem();
        } else {
            errorCount++;
            errorCountDisplay.textContent = 'Erros: ' + errorCount;
            if (errorCount >= 50) {
                showLoseMessage();
            }
        }
    }

    // Função para mostrar mensagem de vitória
    function showWinMessage() {
        messageDisplay.textContent = 'Parabéns! Você conseguiu :D';
        tryAgainButton.style.display = 'none';
    }

    // Função para mostrar mensagem de derrota
    function showLoseMessage() {
        messageDisplay.textContent = 'Oops! Você perdeu :(';
        tryAgainButton.style.display = 'block';
        tryAgainButton.addEventListener('click', function() {
            restartGame();
        });
    }

    // Função para reiniciar o jogo
    function restartGame() {
        score = 0;
        errorCount = 0;
        scoreDisplay.textContent = 'Pontuação: 0';
        errorCountDisplay.textContent = 'Erros: 0';
        messageDisplay.textContent = '';
        tryAgainButton.style.display = 'none';
        moveItem();
        dropItem();
    }

    // Event listeners para os recipientes de lixo (removido)

    // Iniciar o jogo
    moveItem();
    dropItem();
});
