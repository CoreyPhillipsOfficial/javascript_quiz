var timeElement = document.querySelector('#time');
var mainTitle = document.querySelector('#mainTitle');
var instructions = document.querySelector('#instructions');
var startBtn = document.querySelector('#start');
var questionWrap = document.querySelector('.question-wrap');
var questionTextEl = document.querySelector('.question-wrap h2');
var choiceDiv = document.querySelector('.choices');
var choicePopup = document.querySelector('.choice-popup');
var outOfTime = document.querySelector('.out-of-time');
var time = 60;
var questionIndex = 0;
var question;
var timer;

function showQuestion() {
    question = questions[questionIndex];
    // Output the question with the question onject
    questionTextEl.innerText = question.text

    choiceDiv.innerHTML = '';

    question.choices.forEach(function (choice) {
        choiceDiv.insertAdjacentHTML('beforeend', '<button>' + choice + '</button>');
    });
}

function showHighScores() {
    // Stop or clear the timer interval

    // Move user to viewhighscores html page
    localStorage.setItem('score', time);
    window.location = './viewhighscores.html';
}

function checkAnswer(event) {

    var selectedChoice = event.target.innerText;
    var correctAnswer = question.correctAnswer;

    if (selectedChoice === correctAnswer) {
        console.log('Correct answer!');
        choicePopup.innerText = 'Correct!';
    } else {
        console.log('Wrong answer');
        choicePopup.innerText = 'Wrong :(';
        time -= 10;
    }

    choicePopup.classList.remove('hide');

    setTimeout(function () {
        choicePopup.classList.add('hide');

        questionIndex++;

        // The end of the questions
        if (questionIndex === questions.length) {
            return showHighScores();
        }

        showQuestion();
    }, 1500);
}

function startGame() {
    mainTitle.classList.add('hide');
    instructions.classList.add('hide');
    questionWrap.classList.remove('hide');
    questionTextEl.classList.remove('hide');
    timeElement.classList.remove('hide');
    startBtn.classList.add('hide');

    // Start timer
    var timer = setInterval(function () {
        time--;

        if (time < 0) {
            time = 0;
        }

        timeElement.innerText = 'Time: ' + time;

        if (time <= 0) {
            clearInterval(timer);
            time = 0;

            questionWrap.style.display = 'none';
            questionTextEl.classList.add('hide');
            timeElement.classList.add('hide');
            choiceDiv.classList.add('hide');
            outOfTime.classList.remove('hide');

            // outOfTime.innerText = .outOfTime;
        }

    }, 1000)

    showQuestion();
}

startBtn.addEventListener('click', startGame);
choiceDiv.addEventListener('click', checkAnswer);