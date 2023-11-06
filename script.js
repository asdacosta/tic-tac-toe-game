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
    users.score1 = 0;
    users.score2 = 0;
    users.firstUserScore.textContent = '—';
    users.secUserScore.textContent = '—';
    emptyButtons();
    feedback.textContent = 'Begin Game';
})

let buttonsEmptied = true;
function emptyButtons () {
    buttonsEmptied = true;
    gameButtons.forEach((button) => {
        button.textContent = '';
        button.style.backgroundColor = '';
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'rgba(233, 233, 233, 0.1)';
        })
        feedback.textContent = 'Play Round';
    })
}

const duo = (function () {
    function takeNames () {
            users.user1.textContent = prompt('Enter first player name:');
            while (users.user1.textContent === '') {
                alert('Kindly enter a name.');
                users.user1.textContent = prompt('Enter first player name:');
            }
            while (users.user1.textContent.length > 12) {
                alert('Name should be less than 12 characters')
                users.user1.textContent = prompt('Enter first player name:');
            }

            users.user2.textContent = prompt('Enter second player name:');
            while (users.user2.textContent === '') {
                alert('Kindly enter a name.');
                users.user2.textContent = prompt('Enter second player name:');
            }
            while (users.user2.textContent.length > 12) {
                alert('Name should be less than 12 characters')
                users.user2.textContent = prompt('Enter second player name:');
            }
    }

    function choosePick () {
        let currentPick = 'X';
        gameButtons.forEach((button) => {
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = 'rgba(233, 233, 233, 0.1)';
            })
            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = 'transparent';
            })

            button.addEventListener('click', () => {
                if (!button.textContent) {
                    if (buttonsEmptied) {
                        currentPick = 'X';
                        buttonsEmptied = false;
                    } else {
                        currentPick = currentPick === 'X' ? '🌔' : 'X';
                    }
                    button.textContent = currentPick;
                    checkMatch();
                    
                    if (button.textContent !== '') {
                        button.addEventListener('mouseover', () => {
                        button.style.backgroundColor = 'transparent';
                        })
                    }
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
            setTimeout(emptyButtons, 1000);
        // Vertical buttons
        } else if ((gameButtons[m/3].textContent === '🌔' || gameButtons[m/3].textContent === 'X') && gameButtons[m/3].textContent === gameButtons[m/3+3].textContent && gameButtons[m/3+3].textContent === gameButtons[m/3+6].textContent) {
            gameButtons[m/3].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+3].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+6].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';

            if (gameButtons[m/3].textContent === 'X') {
                users.score1 += 1;
                users.firstUserScore.textContent = `${users.score1}`;
    
                if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                    feedback.textContent = 'You conquered this round!';
                } else {
                    feedback.textContent = `${users.user1.textContent} conquered this round!`;
                }
            } else if (gameButtons[m/3].textContent === '🌔') {
                users.score2 += 1;
                users.secUserScore.textContent = `${users.score2}`;
    
                if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                    feedback.textContent = 'You lost this round.';
                } else {
                    feedback.textContent = `${users.user2.textContent} conquered this round!`;
                }
            }
            setTimeout(emptyButtons, 1000);
        // Diagonal buttons
        } else if ((gameButtons[m/1.5].textContent === '🌔' || gameButtons[m/1.5].textContent === 'X') && gameButtons[m/1.5].textContent === gameButtons[4].textContent && gameButtons[4].textContent === gameButtons[-m/1.5+8].textContent) {
            if (m !== 6) {
                gameButtons[m/1.5].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
                gameButtons[4].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
                gameButtons[-m/1.5+8].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
    
                if (gameButtons[m/1.5].textContent === 'X') {
                    users.score1 += 1;
                    users.firstUserScore.textContent = `${users.score1}`;
        
                    if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                        feedback.textContent = 'You conquered this round!';
                    } else {
                        feedback.textContent = `${users.user1.textContent} conquered this round!`;
                    }
                } else if (gameButtons[m/1.5].textContent === '🌔') {
                    users.score2 += 1;
                    users.secUserScore.textContent = `${users.score2}`;
        
                    if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                        feedback.textContent = 'You lost this round.';
                    } else {
                        feedback.textContent = `${users.user2.textContent} conquered this round!`;
                    }
                }
                setTimeout(emptyButtons, 1000);
            }
            declareGameWinner();
        } 
    }
    // Tie
    if (Array.from(gameButtons).every(button => button.textContent !== '') && feedback.textContent === 'Play Round') {
        feedback.textContent = "It's a tie :|";
        setTimeout(emptyButtons, 1000);
    }
}

const declareGameWinner = function () {
    if (users.score1 === 3 || users.score2 === 3) {
        if (users.score1 === 3) {
            if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                feedback.textContent = 'You won the game 🏆';
            } else {
                feedback.textContent = `${users.user1.textContent} won the game 🏅`;
            }
        } else {
            if (users.user1.textContent === 'User' && users.user2.textContent === 'AI') {
                feedback.textContent = 'You lost the game 😞';
            } else {
            feedback.textContent = `${users.user2.textContent} won the game 🏅`;
            }
        }

        users.score1 = 0;
        users.score2 = 0;
        users.firstUserScore.textContent = '—';
        users.secUserScore.textContent = '—';
        setTimeout(function () {
            emptyButtons();
            feedback.textContent = 'Begin Game';
        }, 1000);
    }
}