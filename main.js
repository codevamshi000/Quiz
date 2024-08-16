const questions=[
  {
    question: "Naruto is a member of which clan ?",
    answers:[
      { text: "Hjuga", correct: false},
      { text: "Uchiha", correct: false},
      { text: "Senju", correct: false},
      { text: "Uzumaki", correct: true},
    ]
  },
  {
    question: "Which is the name of the first Hokage ?",
    answers:[
      { text: "Minato Namikaze", correct: false},
      { text: "Hashirama Senju", correct: true},
      { text: "Tsunade", correct: false},
      { text: "Kakashi Hatake", correct: false},
    ]
  },
  {
    question: "Who trained Luffy during the 2 year time skip ?",
    answers:[
      { text: "Roger", correct: false},
      { text: "Shanks", correct: false},
      { text: "Rayleigh", correct: true},
      { text: "Dragon", correct: false},
    ]
  },{
    question: "Which one of the following isn't a member of Straw Hat Pirates ?",
    answers:[
      { text: "Jinbe", correct: false},
      { text: "Brook", correct: false},
      { text: "Zoro", correct: false},
      { text: "Coby", correct: true},
    ]
  },
  {
    question: "What is a demon's greatest weakness?",
    answers:[
      { text: "Sunlight", correct: true},
      { text: "Water Breathing Technique", correct: false},
      { text: "Fire Breathing Technique", correct: false},
      { text: "Moonlight", correct: false},
    ]
  }
];
const questionEle = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQues = 0;  //for checking the questions to score
let score = 0; //for checking the score

function startQuiz(){
  currentQues = 0;
  score =0;
  nextButton.innerHTML="next"; // "next"because at last question we should change to restart instead of  next
  showQuestion(); //function to display next question
}
function showQuestion(){
  resetState();
   let currentQuestion = questions[currentQues];// the current question
   let questionNo= currentQues+ 1; //going to next question increasing arr from(0 to 1)
   questionEle.innerHTML=questionNo + ". " +currentQuestion.question;//the next question

   currentQuestion.answers.forEach(answers =>{
     const button = document.createElement("button");
     button.innerHTML=answers.text;
     button.classList.add("btn");
     answerButton.appendChild(button);
     if(answers.correct){
      button.dataset.correct = answers.correct; //add true or false for answers
     }
     button.addEventListener("click",seletAnswer);
   });
}

function resetState(){
  nextButton.style.display="none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function seletAnswer(e){
  const selectedBtn=e.target;
  const isCorrect=selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
 function showScore(){
  resetState();
  questionEle.innerHTML = `You Scored ${score}  out of ${questions.length}!`;
   nextButton.innerHTML ="Play Again";
   nextButton.style.display ="block";
 }
 function handleNextButton(){
  currentQues++;
  if(currentQues < questions.length){
    showQuestion();
  }else{
    showScore();
  }
 }
nextButton.addEventListener("click",()=>{
  if(currentQues < questions.length){
    handleNextButton();
  }else{
    startQuiz(); // call the function
  }
})

startQuiz(); //call the function