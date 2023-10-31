const select = document.querySelector('select');
const restartButton = document.querySelector('section + button');
const gameButtons = document.querySelectorAll('.real-box button');

const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');

restartButton.addEventListener('click', () => {
    duo.takeNames();
})

const duo = (function () {
    function takeNames () {
        const player1 = document.querySelector('.player1');
        const player2 = document.querySelector('.player2');

        if (select.options[select.selectedIndex].value === 'friend') {
            player1.textContent = prompt('Enter first player name:');
            player2.textContent = prompt('Enter second player name:');
        }
    }

    select.addEventListener('change', () => {
        takeNames();
    })

    let currentPick = 'X';
    gameButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (!button.textContent) {
                button.textContent = currentPick;
                currentPick = currentPick === 'X' ? 'O' : 'X';
            }
        })
    })

    return {takeNames};
})()