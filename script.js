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
        let currentPick = 'X';
        gameButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (!button.textContent) {
                    button.textContent = currentPick;
                    currentPick = currentPick === 'X' ? '🌔' : 'X';
                    checkMatch();
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


const checkMatch = function () {
    for (m = 0; m < 7; m += 3) {
        // Horizontal buttons
        if ((gameButtons[m].textContent === '🌔' || gameButtons[m].textContent === 'X') && gameButtons[m].textContent === gameButtons[m+1].textContent && gameButtons[m+1].textContent === gameButtons[m+2].textContent) {
            gameButtons[m].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[m+1].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[m+2].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
        // Vertical buttons
        } else if ((gameButtons[m/3].textContent === '🌔' || gameButtons[m/3].textContent === 'X') && gameButtons[m/3].textContent === gameButtons[m/3+3].textContent && gameButtons[m/3+3].textContent === gameButtons[m/3+6].textContent) {
            gameButtons[m/3].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+3].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+6].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
        // Diagonal buttons
        } else if ((gameButtons[m/1.5].textContent === '🌔' || gameButtons[m/1.5].textContent === 'X') && gameButtons[m/1.5].textContent === gameButtons[(4*m)/3].textContent && gameButtons[(4*m)/3].textContent === gameButtons[-m/1.5+8].textContent) {
            gameButtons[m/1.5].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[(4*m)/3].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[-m/1.5+8].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
        }
    }
}