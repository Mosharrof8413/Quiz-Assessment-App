// Selecting elements
const startButton = document.querySelector(".MyBtn button");
const rulesBox = document.querySelector(".RulesBox");
const exitButton = document.querySelector(".ExitButton");
const continueButton = document.querySelector(".ContinueButton");
const questionsBox = document.querySelector(".Questions");
const optionsContainer = document.querySelector(".MyOptions");
const timeCount = document.querySelector(".Seconds");
const timeLine = document.querySelector(".time_lines");
const timeOff = document.querySelector(".TimeLeft");
const nextButton = document.querySelector(".nextBtn");
const resultBox = document.querySelector(".reslut_box");
const restartButton = document.querySelector(".restart1");
const quitButton = document.querySelector(".quit");

// Show rules box on start button click
startButton.onclick = () => {
    rulesBox.classList.add("activeInfo");
}

// Close rules box on exit button click
exitButton.onclick = () => {
    rulesBox.classList.remove("activeInfo");
}

// Start the quiz on continue button click
continueButton.onclick = () => {
    rulesBox.classList.remove("activeInfo");
    questionsBox.classList.add("activeQuiz");
    showQuestion(0);
    startTimer(15);
    startTimerLine(0);
}

// Initialize variables
let questionIndex = 0;
let timer;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

// Proceed to the next question on next button click
nextButton.onclick = () => {
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        showQuestion(questionIndex);
        clearInterval(timer);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextButton.style.display = "none";
        timeOff.textContent = "Time Left";
    } else {
        clearInterval(timer);
        clearInterval(counterLine);
        showResultBox();
    }
}

// Display a question and its options
function showQuestion(index) {
    const questionText = document.querySelector(".text");
    const optionsHTML = questions[index].options.map((option, i) => {
        return `<div class="options" onclick="selectOption(this)"><span>${option}</span></div>`;
    }).join('');
    
    questionText.innerHTML = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    optionsContainer.innerHTML = optionsHTML;
}

// Handle user option selection
function selectOption(answer) {
    clearInterval(timer);
    clearInterval(counterLine);
    const userAnswer = answer.textContent;
    const correctAnswer = questions[questionIndex].answer;

    if (userAnswer === correctAnswer) {
        userScore++;
        answer.classList.add("correct");
    } else {
        answer.classList.add("incorrect");
        const correctOption = optionsContainer.querySelector(".options span");
        correctOption.classList.add("correct");
    }

    const allOptions = optionsContainer.querySelectorAll(".options");
    allOptions.forEach(option => option.classList.add("disabled"));

    nextButton.style.display = "block";
}

// Timer countdown function
function startTimer(time) {
    counter = setInterval(() => {
        timeCount.textContent = time < 10 ? "0" + time : time;
        time--;

        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";
            const correctOption = optionsContainer.querySelector(".options span");
            correctOption.classList.add("correct");

            const allOptions = optionsContainer.querySelectorAll(".options");
            allOptions.forEach(option => option.classList.add("disabled"));

            nextButton.style.display = "block";
        }
    }, 1000);
}

// Timer line animation function
function startTimerLine(time) {
    counterLine = setInterval(() => {
        time++;
        timeLine.style.width = time + "px";

        if (time > 319) {
            clearInterval(counterLine);
        }
    }, 50);
}

// Display result box with user's score
function showResultBox() {
    rulesBox.classList.remove("activeInfo");
    questionsBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");

    const scoreText = document.querySelector(".score_text span");
    scoreText.innerHTML = userScore > 5
        ? `Congratulations! You got <p>${userScore}</p> out of <p>${questions.length}</p>`
        : userScore > 3
        ? `Carry on! You got <p>${userScore}</p> out of <p>${questions.length}</p>`
        : `I'm sorry! You got <p>${userScore}</p> out of <p>${questions.length}</p>`;
}

// Restart the quiz on restart button click
restartButton.onclick = () => {
    resultBox.classList.remove("activeResult");
    questionsBox.classList.add("activeQuiz");
    questionIndex = 0;
    userScore = 0;
    showQuestion(questionIndex);
    startTimer(timeValue);
    startTimerLine(widthValue);
    nextButton.style.display = "none";
    timeOff.textContent = "Time Left";
    const allOptions = optionsContainer.querySelectorAll(".options");
    allOptions.forEach(option => {
        option.classList.remove("correct", "incorrect", "disabled");
    });
}

// Reload the page on quit button click
quitButton.onclick = () => {
    window.location.reload();
}

// Array of quiz questions
const questions =[
        {
            numb:1,
            question:'What Does HTML Stand For?',
            answer:'Hyper Text Markup Language',
            options:[
                "Hyper Text Preprocessor",
                "Hyper Text Markup Language",
                "Hyper Text Multiple Language",
                "Hyper Tool Multi Language"
            ]
        },
        {
            numb: 2,
            question: "What Does CSS Stand For?",
            answer: "Cascading Style Sheet",
            options: [
              "Common Style Sheet",
              "Colorful Style Sheet",
              "Computer Style Sheet",
              "Cascading Style Sheet"
            ]
          },
          {
            numb: 3,
            question: "What Does PHP Stand For?",
            answer: "Hypertext Preprocessor",
            options: [
              "Hypertext Preprocessor",
              "Hypertext Programming",
              "Hypertext Preprogramming",
              "Hometext Preprocessor"
            ]
          },
        
          {
            numb: 4,
            question: "What does SQL stand for?",
            answer: "Structured Query Language",
            options: [
              "Stylish Question Language",
              "Stylesheet Query Language",
              "Statement Question Language",
              "Structured Query Language"
            ]
          },
      
          {
            numb: 5,
            question: "What does XML stand for?",
            answer: "eXtensible Markup Language",
            options: [
              "eXtensible Markup Language",
              "eXecutable Multiple Language",
              "eXTra Multi-Program Language",
              "eXamine Multiple Language"
            ]
          },
          {
            numb:6,
            question:"What is a data structure?",
            answer:"A way to store and organize data",
            options:
            [
            "A collection of algorithms",
            "A way to store and organize data",
            "A programming language",
            " A type of computer hardware"
          ]
          },
          {
            numb:7,
            question:"Used for implementing recursion?",
            answer:"Stack",
            options:
            [
              "Stack",
              "Queue",
              "List",
              "Array"
            ]
          },
          {
            numb:8,
            question:"Used for parentheses matching?",
            answer:"Stack",
            options:
            [
              "Stack",
              "Queue",
              "List",
              "Priorituy queue"
            ]
          },
          {
            numb:9,
            question:"In OOP,code reusability?",
            answer:"Inheritance",
            options:
            [
              "Abstraction",
              "Polymorphism",
              "Encapsulation",
              "Inheritance"
            ]
          },
          {
            numb:9,
            question:"What is the full form of OSI?",
            answer:"open system interconnection",
            options:
            [
              "optical service implementation",
              "open service Internet",
              "open system interconnection",
              "operating system interface"
            ]
          }
];
