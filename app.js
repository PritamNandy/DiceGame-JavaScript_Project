/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/
var  scores, roundScore, activePlayer, gameState;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gameState) {
        //Random Number for Dice 1-6
        var dice = Math.floor(Math.random() * 6) +1;

        //Show Dice image for the random number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //Update score if dice value is not 1 or Switch Player
        if(dice != 1) {
            roundScore += dice;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    } else {
        init();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    roundScore = scores[activePlayer] + roundScore;
    scores[activePlayer] = roundScore;
    document.getElementById('score-'+activePlayer).textContent = roundScore;
    if(roundScore >= 50) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gameState = false;
    } else {
        nextPlayer(); 
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    init();
})

//Function to pass game to next player if dice value is 1 or current player press hold
function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}


//function to initialise the game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameState = true;
    
    //Initially Dice Image and all values will be 0
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');  
}


