
var position = 0;        
var dataQuestion = [];   
var score = 0;           
const container = document.getElementById("container-question");   
const finishSection = document.getElementById("finish-section");  

function getQuestion() {                                                     
  const totalQuestions = document.getElementById("n-questions").value;       
  const categoryQuestions = document.getElementById("category").value;       
  const difficultyQuestions = document.getElementById("difficulty").value;  
  const typeQuestions = document.getElementById("type").value;              
  const link = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${categoryQuestions}&difficulty=${difficultyQuestions}&type=${typeQuestions}`;  
  fetch(link)                               
    .then((response) => response.json())    
    .then((data) => {                       
      dataQuestion = data;                  

      if (typeQuestions === "multiple") {                                      
        container.innerHTML = renderQuestionsTemplate(dataQuestion.results);  
      } else {                                                                 
        container.innerHTML = renderQuestionsBoolean(dataQuestion.results);    
      }
    });
}

function desorderPositionArray(array, iter) {               
  let random = []                                          

  while (random.length < iter) {                            

    let positionArray = Math.floor(Math.random() * iter)    

    if (!random.includes(array[positionArray])) {           
      random.push(array[positionArray])                     
    }
  }
  return random                                             
}


function hiddeForm() {                                     
  document.getElementById("form-cont").classList.add("dp-none");
}


function changeQuestion() {                                 

  getInputsValue()                                          

  if (position === dataQuestion.results.length - 1) {       
    container.style.display = "none"                              
    finishSection.innerHTML = `<div class = "finish" style="width: 100%; padding: 100px 0px; text-align: center; font-size: 1.3rem;"><h1 class = "mb">Test finished<br> Score = ${score}</h1><a href="../pages/select.html">Play Again</a></div>`
    return
  }

  position++;                                                             
  const typeQuestions = document.getElementById("type").value;            
  if (typeQuestions === "multiple") {                                     
    container.innerHTML = renderQuestionsTemplate(dataQuestion.results);  
  } else {                                                                
    container.innerHTML = renderQuestionsBoolean(dataQuestion.results);   
  }
  return;

}


function renderQuestionsTemplate(question) {                 
  var array = question[position].incorrect_answers           
  array.push(question[position].correct_answer)              
  let newOrderQuestion = desorderPositionArray(array, 4)     
  return `<form class="form-test" onsubmit="event.preventDefault(), changeQuestion()">   
    <div class="question-form">
      <h2>${question[position].question}</h2>
    </div>

    <div class="answer-form">
      <label>
        <input type="radio" name="answer" value="${newOrderQuestion[0]}" required>
        ${newOrderQuestion[0]}
      </label>

      <label>
        <input type="radio" name="answer" value="${newOrderQuestion[1]}">
        ${newOrderQuestion[1]}
      </label>

      <label>
        <input type="radio" name="answer" value="${newOrderQuestion[2]}">
        ${newOrderQuestion[2]}
      </label>

      <label>
        <input type="radio" name="answer" value="${newOrderQuestion[3]}" >
        ${newOrderQuestion[3]}
      </label>

      <button type="submit">
        NEXT
      </button>
    </div>
  </form>`;
}

function renderQuestionsBoolean(question) {                   
  var arraybool = question[position].incorrect_answers        
  arraybool.push(question[position].correct_answer)           
  let newOrderQuestion = desorderPositionArray(arraybool, 2)  
  return `<form class="form-test"  onsubmit="event.preventDefault(), changeQuestion()">
    <div class="question-form">
      <h2>${question[position].question}</h2>
    </div>

    <div class="answer-form">
      <label>
        <input type="radio" name="answer" value="${newOrderQuestion[0]}" required>
        ${newOrderQuestion[0]}
      </label>

      <label>
        <input type="radio" name="answer" value="${newOrderQuestion[1]}" />
        ${newOrderQuestion[1]}
      </label>

      <button type="submit">
        NEXT
      </button>
    </div>
  </form>`;
}

// ahora vamos a sacar el resultado                           
function getInputsValue() {                                   
  let answerInput = document.getElementsByTagName("input");   
  answerInput = Array.from(answerInput);                     
  answerInput.map(element => {                                
    if (element.checked) {                                   
      if (element.value === dataQuestion.results[position].correct_answer) {  
        score = score + 10;                                  
      }
    }
  })
}



