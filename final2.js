const startBtn = document.getElementById("startBtn");
const questionContainer = document.getElementById("questionContainer");
const scoreDisplay = document.getElementById("score");
let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.style.display = "none";
    loadNextQuestion();
}

async function loadNextQuestion() {
    const response = await fetch("https://jservice.io/api/random");
    const data = await response.json();


    if (data[0] && data[0].question && data[0].answer) {
        const question = data[0].question;
        const correctAnswer = data[0].answer;

        const html = `
            <h2>${question}</h2>
            <input type="text" id="userAnswer" placeholder="Your answer">
            <button id="submitButton">Submit</button>
        `;

        questionContainer.innerHTML = html;

        // Add event listener to the submit button
        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", () => checkAnswer(correctAnswer));
    } else {
        finishQuiz();
    }
}


let questionsAnswered = 0

function checkAnswer(correctAnswer) {
    const userAnswer = document.getElementById("userAnswer").value;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        questionsAnswered++;
        scoreDisplay.innerText = `Score: ${score}`;
        alert("Correct!");
    } else { 
        alert("Incorrect");
    } 

    if (questionsAnswered >= 5) {
        finishQuiz();
    } else {
        loadNextQuestion();
    }
}

 

function finishQuiz() {
    questionContainer.innerHTML = `<h2>Quiz Finished</h2><p>Your final score is: ${score}</p>`;
}
