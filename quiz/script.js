const questions = [
    {
        question: "Które państwo jest największym pod względem powierzchni na świecie?",
        answers: [
            { text: "Rosja", correct: true },
            { text: "Kanada", correct: false },
            { text: "Stany Zjednoczone", correct: false },
            { text: "Chiny", correct: false },
        ],
    },
    {
        question: "Ile kontynentów jest na Ziemi?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
        ],
    },
    {
        question: "Jaki jest najdłuższy rzeka na świecie?",
        answers: [
            { text: "Nil", correct: false },
            { text: "Amazonka", correct: true },
            { text: "Missisipi", correct: false },
            { text: "Jangcy", correct: false },
        ],
    },
    {
        question: "Które miasto jest stolicą Australii?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Canberra", correct: true },
            { text: "Melbourne", correct: false },
            { text: "Brisbane", correct: false },
        ],
    },
    {
        question: "Góra Everest znajduje się w którym państwie?",
        answers: [
            { text: "Indie", correct: false },
            { text: "Tibet", correct: false },
            { text: "Nepal", correct: true },
            { text: "Bhutan", correct: false },
        ],
    },
    {
        question: "Jaka jest największa wyspa na świecie?",
        answers: [
            { text: "Australia", correct: false },
            { text: "Borneo", correct: false },
            { text: "Madagaskar", correct: false },
            { text: "Grenlandia", correct: true },
        ],
    },
    {
        question: "Które morze leży między Europą a Afryką?",
        answers: [
            { text: "Morze Śródziemne", correct: true },
            { text: "Morze Czarne", correct: false },
            { text: "Morze Egejskie", correct: false },
            { text: "Morze Adriatyckie", correct: false },
        ],
    },
    {
        question: "W którym kraju znajduje się Wielki Kanion?",
        answers: [
            { text: "Kanada", correct: false },
            { text: "Stany Zjednoczone", correct: true },
            { text: "Meksyk", correct: false },
            { text: "Brazylia", correct: false },
        ],
    },
    {
        question: "Które państwo jest najmniejsze pod względem powierzchni na świecie?",
        answers: [
            { text: "Monako", correct: false },
            { text: "Watykan", correct: true },
            { text: "San Marino", correct: false },
            { text: "Nauru", correct: false },
        ],
    },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Następny";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }  
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    switch (score) {
        
        case 1:
            questionElement.innerHTML = `Gratulacje udało ci się zdobyć ${score} punkt na ${questions.length}!`;
            tryAgainDisplay();
            break;
        case 2:
        case 3:
        case 4:
            questionElement.innerHTML = `Gratulacje udało ci się zdobyć ${score} punkty na ${questions.length}!`;
            tryAgainDisplay()
            break;
        case 0:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            questionElement.innerHTML = `Gratulacje udało ci się zdobyć ${score} punktów na ${questions.length}!`;
            tryAgainDisplay()
            break;
    }

    function tryAgainDisplay() {
        nextButton.innerHTML = "Spróbuj Ponownie";
        nextButton.style.display = "block";
    }
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else
    {
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();        
    }
    else
    {
        startQuiz();
    }
});


startQuiz();