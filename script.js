const select = document.querySelector('select');
const restartButton = document.querySelector('section + button');
const gameButtons = document.querySelectorAll('.real-box button');

const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');

restartButton.addEventListener('click', () => {
    if (select.options[select.selectedIndex].value === 'friend') {
        duo.takeNames();
    }
    emptyButtons();
})

function emptyButtons () {
    gameButtons.forEach((button) => {
        button.textContent = '';
    })
}

const duo = (function () {
    function takeNames () {
        const player1 = document.querySelector('.player1');
        const player2 = document.querySelector('.player2');

            player1.textContent = prompt('Enter first player name:');
            player2.textContent = prompt('Enter second player name:');
    }

    function choosePick () {
        let currentPick = '✯';
        gameButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (!button.textContent) {
                    button.textContent = currentPick;
                    currentPick = currentPick === '✯' ? '🌔' : '✯';
                }
            })
        })
    }

    select.addEventListener('change', () => {
        if (select.options[select.selectedIndex].value === 'friend') {
            takeNames();
            choosePick();
        }
    })

    return {takeNames};
})()