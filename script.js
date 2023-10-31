const select = document.querySelector('select');
const restartButton = document.querySelector('section + button');
const gameButtons = document.querySelectorAll('.real-box button');
const feedback = document.querySelector('.feedback');


const users = (function () {
    const user1 = document.querySelector('.player1');
    const user2 = document.querySelector('.player2');
    const firstUserScore = document.querySelector('.score1');
    const secUserScore = document.querySelector('.score2');

    let score1 = 0;
    let score2 = 0;

    return {user1, user2, firstUserScore, secUserScore, score1, score2};
})()

restartButton.addEventListener('click', () => {
    if (select.options[select.selectedIndex].value === 'friend') {
        duo.takeNames();
    }
    users.firstUserScore.textContent = '—';
    users.secUserScore.textContent = '—';
    emptyButtons();
})

function emptyButtons () {
    gameButtons.forEach((button) => {
        button.textContent = '';
        button.style.backgroundColor = '';
        feedback.textContent = 'Begin Game';
    })
}

const duo = (function () {
    function takeNames () {
            users.user1.textContent = prompt('Enter first player name:');
            users.user2.textContent = prompt('Enter second player name:');
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
    function update () {
        if (gameButtons[m].textContent === 'X') {
            users.score1 += 1;
            users.firstUserScore.textContent = `${users.score1}`;

            if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                feedback.textContent = 'You conquered this round!';
            } else {
                feedback.textContent = `${users.user1.textContent} conquered this round!`;
            }
        } else if (gameButtons[m].textContent === '🌔') {
            users.score2 += 1;
            users.secUserScore.textContent = `${users.score2}`;

            if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                feedback.textContent = 'You lost this round.';
            } else {
                feedback.textContent = `${users.user2.textContent} conquered this round!`;
            }
        }
    }

    for (m = 0; m < 7; m += 3) {
        // Horizontal buttons
        if ((gameButtons[m].textContent === '🌔' || gameButtons[m].textContent === 'X') && gameButtons[m].textContent === gameButtons[m+1].textContent && gameButtons[m+1].textContent === gameButtons[m+2].textContent) {
            gameButtons[m].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[m+1].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[m+2].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';

            update();
            setTimeout(emptyButtons, 2000);
        // Vertical buttons
        } else if ((gameButtons[m/3].textContent === '🌔' || gameButtons[m/3].textContent === 'X') && gameButtons[m/3].textContent === gameButtons[m/3+3].textContent && gameButtons[m/3+3].textContent === gameButtons[m/3+6].textContent) {
            gameButtons[m/3].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+3].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+6].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';

            update();
            setTimeout(emptyButtons, 2000);
        // Diagonal buttons
        } else if ((gameButtons[m/1.5].textContent === '🌔' || gameButtons[m/1.5].textContent === 'X') && gameButtons[m/1.5].textContent === gameButtons[4].textContent && gameButtons[4].textContent === gameButtons[-m/1.5+8].textContent) {
            if (m !== 6) {
                gameButtons[m/1.5].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
                gameButtons[4].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
                gameButtons[-m/1.5+8].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
    
                update();
                setTimeout(emptyButtons, 2000);
            }
        } 
    }
    if (Array.from(gameButtons).every(button => button.textContent !== '')) {
        feedback.textContent = "It's a tie :|";
        setTimeout(emptyButtons, 2000);
    }
}