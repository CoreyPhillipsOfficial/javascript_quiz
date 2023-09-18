var showScoresBtn = document.querySelector('#show-scores');
var scoresOutputDiv = document.querySelector('.scores-output');
var scoreFormWrap = document.querySelector('.score-form-wrap');
var scoreOutput = document.querySelector('#score-output');
var scoreForm = document.querySelector('#score-form');
var score = localStorage.getItem('score');


function getHighscores() {
    return JSON.parse(localStorage.getItem('highschores')) || [];
}

function saveHighscore() {
    var nameInput = document.querySelector('#name-input')
    var name = nameInput.value;

    var highscores = getHighscores();

    highscores.push({
        name: name,
        score: score
    })

    localStorage.setItem('highscores', JSON.stringify(highscores));
}

function showScoreOutput() {
    scoreFormWrap.classList.add('hide');
    scoresOutputDiv.classList.remove('hide');

    var highscores = getHighscores();

    if (!highscores.length) {
        scoresOutputDiv.innerHTML = '<p>No scores have been saved</p>';
    }

    highscores.forEach(function (scoreObj) {
        scoresOutputDiv.insertAdjacentElement('beforeend', `
        <div>
            <h3>Name: ${scoreObj.name}</h3>
            <p>Score: ${scoreObj.score}</p>
        </div>
        `);
    });

}


function showScore() {
    var score = localStorage.getItem('score');
    scoreOutput.innerText = 'Your high score: ' + score;
}

showScore();
showScoresBtn.addEventListener('click', showScoreOutput);
scoreForm.addEventListener('submit', saveHighscore);