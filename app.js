/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores = [0,0]//first score is player 0 global score, second score is player 1 global score
let roundScore = 0;//for each round
let currentPlayer = 0;
let gamePlaying = true;

function initialize(){
  document.querySelector('#score-0').textContent = `${scores[0]}`;
  document.querySelector('#score-1').textContent = `${scores[1]}`;
  document.querySelector('#current-0').textContent = `${roundScore}`;
  document.querySelector('#current-1').textContent = `${roundScore}`;
  document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-roll').addEventListener('click',function(){
  if (gamePlaying) {
    let roll = Math.floor(Math.random()*6 + 1)
    if (roll !== 1) {
      document.querySelector('.dice').style.display = 'block';
      document.querySelector('.dice').src = "dice-" + roll + ".png"
      roundScore += roll;
      document.querySelector('#current-' + currentPlayer).textContent = `${roundScore}`;
    }else{
      document.querySelector('.dice').style.display = 'none';
      roundScore = 0;
      document.querySelector('#current-' + currentPlayer).textContent = `${roundScore}`;
      switchPlayers();
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click',function(){
  if (gamePlaying) {
    
  }
})

initialize();

function switchPlayers(){
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
}
