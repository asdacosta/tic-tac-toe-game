const select = document.querySelector('select');
const restartButton = document.querySelector('section + button');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');

restartButton.addEventListener('click', () => {
    if (select.options[select.selectedIndex].value === 'friend') {
        player1.textContent = prompt('Enter first player name:');
        player2.textContent = prompt('Enter second player name:');
    }
})

select.addEventListener('change', () => {

    // const duoOption = document.querySelector('.duo');
    const duoOption = select.options[select.selectedIndex];
    if (duoOption.value === 'friend') {
    
        player1.textContent = prompt('Enter first player name:');
        player2.textContent = prompt('Enter second player name:');
    }
})