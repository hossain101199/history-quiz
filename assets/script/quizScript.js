const quizData = [
  {
    question: "When did World War 1 start?",
    a: "1914",
    b: "1918",
    c: "1818",
    d: "1814",
    correct: "a",
  },
  {
    question: "What is the Versailles treaty?",
    a: "Formal ending of WW1",
    b: "Trade disruption ending",
    c: "Alliance between USA and Russia",
    d: "Legalizing tobacco",
    correct: "a",
  },
  {
    question: "Who was the ruthless dictator of WW2?",
    a: "Asif Ali",
    b: "Maisha Binte",
    c: "Adolf Hitler",
    d: "Ratul",
    correct: "c",
  },
  {
    question: "Why did the Germans fail to break through at Verdun in 1916?",
    a: "The Germans had less number of soldiers",
    b: "Nivelle had superior artillery and tactics",
    c: "Hitler was not in charge yet",
    d: "They had no air support",
    correct: "b",
  },
  {
    question: "Why was the Berlin Blockade lifted in May 1949?",
    a: "WW2 was over",
    b: "Due to economic unrest in East Berlin",
    c: "Russia lost the war",
    d: "Capitalist ventures",
    correct: "b",
  },
  {
    question: "What is the Cold War?",
    a: "A war fought in the winter",
    b: "North European countries engaging in battle",
    c: "It is not an actual war, just geopolitical tension between USA and USSR",
    d: "War fought over for the rights of owning Antarctica",
    correct: "c",
  },
  {
    question:
      "Which country fought for their mother language in 1971 against Pakistan?",
    a: "Wales",
    b: "Thailand",
    c: "USA",
    d: "Bangladesh",
    correct: "d",
  },
  {
    question: "When was the Napoleon Revolution?",
    a: "1782 to 1785",
    b: "1639 to 1655",
    c: "1792 to 1799",
    d: "1780 to 1786",
    correct: "c",
  },
  {
    question:
      "Which country did not accept Israel as a country during its inception in 1948?",
    a: "Bangladesh",
    b: "USA",
    c: "UK",
    d: "Australia",
    correct: "a",
  },
  {
    question: "When did Palestinians settle in Gaza?",
    a: "12,500 to 9,500 BCE",
    b: "1948 to 1950",
    c: "1515 to 1569",
    d: "1010 to 1121 AD",
    correct: "a",
  },
];

const quiz = document.querySelector(".quiz-body");
const quizContainer = document.querySelector(".quiz-container");
const answerEl = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const footerEl = document.querySelector(".quiz-footer");
const quizDetailEl = document.querySelector(".quiz-details");
const liEl = document.querySelector("ul li");

const a_txt = document.getElementById("a_text");
const b_txt = document.getElementById("b_text");
const c_txt = document.getElementById("c_text");
const d_txt = document.getElementById("d_text");
const btnSubmit = document.getElementById("btn");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_txt.innerText = currentQuizData.a;
  b_txt.innerText = currentQuizData.b;
  c_txt.innerText = currentQuizData.c;
  d_txt.innerText = currentQuizData.d;
  quizDetailEl.innerHTML = `<p>${currentQuiz + 1} of ${quizData.length}</p>`;
}

// deselect
function deselectAnswers() {
  answerEl.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

// get selected
function getSelected() {
  let answer;
  answerEl.forEach((answerEls) => {
    if (answerEls.checked) {
      answer = answerEls.id;
    }
  });
  return answer;
}

btnSubmit.addEventListener("click", function () {
  const answers = getSelected();

  if (answers) {
    if (answers === quizData[currentQuiz].correct) {
      score++;
    }
    nextQuestion();
  }
});

let timeInSeconds = 0;

// Function to update the timer display
function updateTimer() {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  document.getElementById(
    "timer"
  ).innerText = `${hours} : ${minutes} : ${seconds}`;

  // Increment time by 1 second
  timeInSeconds++;
}

// Start the timer by calling updateTimer every second
const timerInterval = setInterval(updateTimer, 1000);

// next Slide
function nextQuestion() {
  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    clearInterval(timerInterval);

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    quizContainer.innerHTML = `
    <div
      style="
        margin: 2rem;
        padding: 2rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;
      "
    >
      <h2>Result</h2>
      <div>
        <p>Total Question: ${quizData.length}</p>
        <p>Correct Answers: ${score}</p>
        <p>Wrong Answers: ${quizData.length - score}</p>
        <p>Time: ${hours} : ${minutes} : ${seconds}</p>
      </div>
  
      <a id="startLink" href="../../index.html">Home</a>

      <a href="https://papers.gceguide.com/O%20Levels/History%20(2147)/2020/">Click here to practice more</a>
    </div>
    `;
  }
}
