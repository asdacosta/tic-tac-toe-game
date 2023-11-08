const select = document.querySelector('select');
const restartButton = document.querySelector('section + button');
const gameButtons = document.querySelectorAll('.real-box button');
const feedback = document.querySelector('.feedback');

const hint = (function () {
    const icon = document.querySelector('img');
    const span = document.querySelector('.bulb span');
    icon.addEventListener('mouseover', () => {
        span.innerHTML = 'Bonne Chance 🌟<br>The first player to form a line wins the round.<br>To win the game, a player must win three rounds.';
        span.style.padding = '10px';
    })
    icon.addEventListener('mouseout', () => {
        span.textContent = '';
        span.style.padding = '0';
    })
})()

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

    // Button parameter will make eventListener target specific button clicked. Access to the button in the Returned fxn will be retained.
    function clicker (button) {
        // EventListerner works with closures, hence the return
        return() => {
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
                    });
                }
            }
        };
    }

    function choosePick () {
        let currentPick = 'X';
        gameButtons.forEach((button) => {
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = 'rgba(233, 233, 233, 0.1)';
            })
            button.addEventListener('mouseout', () => {
                if (!thereIsAMatch) {
                    button.style.backgroundColor = 'transparent';
                }
                thereIsAMatch = false;
            })

            button.addEventListener('click', clicker(button))
        })
    }

    select.addEventListener('change', () => {
        if (select.options[select.selectedIndex].value === 'friend') {
            takeNames();
            choosePick();
        }
    })

    return {takeNames, choosePick};
})()

let thereIsAMatch = false; // To avoid making green buttons transparent (by mouseout eventListener) when there's a match
const checkMatch = function () {
    function stopClick () {
        gameButtons.forEach((button) => {
            button.style.pointerEvents = 'none';
        })
    }
    function resumeClick () {
        gameButtons.forEach((button) => {
            button.style.pointerEvents = 'auto';
        })
    }

    for (m = 0; m < 7; m += 3) {
        // Horizontal buttons
        if ((gameButtons[m].textContent === '🌔' || gameButtons[m].textContent === 'X') && gameButtons[m].textContent === gameButtons[m+1].textContent && gameButtons[m+1].textContent === gameButtons[m+2].textContent) {
            gameButtons[m].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[m+1].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[m+2].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            thereIsAMatch = true;

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

            stopClick();
            setTimeout(function () {
                emptyButtons();
                resumeClick();
            }, 2000);
        // Vertical buttons
        } else if ((gameButtons[m/3].textContent === '🌔' || gameButtons[m/3].textContent === 'X') && gameButtons[m/3].textContent === gameButtons[m/3+3].textContent && gameButtons[m/3+3].textContent === gameButtons[m/3+6].textContent) {
            gameButtons[m/3].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+3].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
            gameButtons[m/3+6].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
            thereIsAMatch = true;

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

            stopClick();
            setTimeout(function () {
                emptyButtons();
                resumeClick();
            }, 2000);
        // Diagonal buttons
        } else if ((gameButtons[m/1.5].textContent === '🌔' || gameButtons[m/1.5].textContent === 'X') && gameButtons[m/1.5].textContent === gameButtons[4].textContent && gameButtons[4].textContent === gameButtons[-m/1.5+8].textContent) {
            if (m !== 6) {
                gameButtons[m/1.5].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
                gameButtons[4].style.backgroundColor= 'rgba(172, 248, 86, 0.5)';
                gameButtons[-m/1.5+8].style.backgroundColor = 'rgba(172, 248, 86, 0.5)';
                thereIsAMatch = true
    
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

            stopClick();
            setTimeout(function () {
                emptyButtons();
                resumeClick();
            }, 2000);
            }
        }
        declareGameWinner();
    }
    // Tie
    if (Array.from(gameButtons).every(button => button.textContent !== '') && thereIsAMatch === false) {
        feedback.textContent = "It's a tie :|";
        setTimeout(emptyButtons, 2000);
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

        gameButtons.forEach((button) => {
            button.style.pointerEvents = 'none';
        })
        setTimeout(function () {
            emptyButtons();
            gameButtons.forEach((button) => {
                button.style.pointerEvents = 'auto';
            })
            feedback.textContent = 'Begin Game';
        }, 2000); 
    }
}

const transitionHeaderColor = (function () {
    function changeColor () {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
    
        let color = `rgb(${red}, ${green}, ${blue})`;
        const header = document.querySelector('h1');
        header.style.color = color;
    }
    
    setInterval(changeColor, 2000);
})()



