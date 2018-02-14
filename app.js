/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

  extra rule: player loses ENTIRE score when two sixes in a row are rolled
*/


let scores, roundScore, currentPlayer, gamePlaying, previousRoll;

function initialize(){
  scores = [0,0]//first score is player 0 global score, second score is player 1 global score
  roundScore = 0;//for each round
  currentPlayer = 0;
  //set state variable
  gamePlaying = true;
  document.querySelector('.one-label').style.display = 'none';
  document.querySelector('.double-six').style.display = 'none';
  document.querySelector('#score-0').textContent = `${scores[0]}`;
  document.querySelector('#score-1').textContent = `${scores[1]}`;
  document.querySelector('#current-0').textContent = `${roundScore}`;
  document.querySelector('#current-1').textContent = `${roundScore}`;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')
  document.querySelector('#name-0').textContent = 'Player 1'
  document.querySelector('#name-1').textContent = 'Player 2'
}

document.querySelector('.btn-roll').addEventListener('click',function(){
  if (gamePlaying) {

    let roll = Math.floor(Math.random()*6 + 1)
    console.log([previousRoll, roll])

    if (roll !== 1) {
      //rolling two sixes in a row
      if (roll === 6 && previousRoll === 6) {
        document.querySelector('.dice').style.display = 'none';
        roundScore = 0;
        document.querySelector('#current-' + currentPlayer).textContent = `${roundScore}`;
        scores[currentPlayer] = 0
        document.querySelector('#score-' + currentPlayer).textContent = `${scores[currentPlayer]}`;
        document.querySelector('.double-six').style.display = 'block';
        document.querySelector('.one-label').style.display = 'none';
        switchPlayers();
      }else{
      document.querySelector('.one-label').style.display = 'none';
      document.querySelector('.double-six').style.display = 'none';
      document.querySelector('.dice').style.display = 'block';
      document.querySelector('.dice').src = "dice-" + roll + ".png"
      roundScore += roll;
      document.querySelector('#current-' + currentPlayer).textContent = `${roundScore}`;
      previousRoll = roll;
      }
      //if it hits one
    }else{
      document.querySelector('.one-label').style.display = 'block';
      document.querySelector('.double-six').style.display = 'none';
      // document.querySelector('.dice-container').textContent = 'Rolled a one!'
      document.querySelector('.dice').style.display = 'none';
      roundScore = 0;
      document.querySelector('#current-' + currentPlayer).textContent = `${roundScore}`;
      switchPlayers();
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click',function(){
  if (gamePlaying) {
    document.querySelector('.one-label').style.display = 'none';
    document.querySelector('.double-six').style.display = 'none';

    scores[currentPlayer] += roundScore;
    roundScore = 0;
    document.querySelector('#current-' + currentPlayer).textContent = `${roundScore}`;
    document.querySelector('#score-' + currentPlayer).textContent = `${scores[currentPlayer]}`;
    if (scores[currentPlayer] + roundScore < 100) {
      switchPlayers();
    }else{
      //change state variable
      gamePlaying = false;
      document.querySelector('#name-' + currentPlayer).textContent = 'Winner!'
    }
  }
})

initialize();

function switchPlayers(){
  previousRoll = null;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',function(){
  initialize();
})
