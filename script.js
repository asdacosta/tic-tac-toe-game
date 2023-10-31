const select = document.querySelector('select');
const restartButton = document.querySelector('section + button');

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

    return {takeNames};
})()