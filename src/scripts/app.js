
var position = 0;        //15   posicion 0 por defecto
var dataQuestion = [];   //12
var score = 0;           //27
const container = document.getElementById("container-question");   //1
const finishSection = document.getElementById("finish-section");   //2

function getQuestion() {                                                     //3 creamos aqui y ejecutamos en html
  const totalQuestions = document.getElementById("n-questions").value;       //4
  const categoryQuestions = document.getElementById("category").value;       //5
  const difficultyQuestions = document.getElementById("difficulty").value;   //6
  const typeQuestions = document.getElementById("type").value;               //7
  const link = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${categoryQuestions}&difficulty=${difficultyQuestions}&type=${typeQuestions}`;  //8
  fetch(link)                               //9
    .then((response) => response.json())    //10
    .then((data) => {                       //11
      dataQuestion = data;                  //13

      if (typeQuestions === "multiple") {                                      //19
        container.innerHTML = renderQuestionsTemplate(dataQuestion.results);   //19
      } else {                                                                 //19
        container.innerHTML = renderQuestionsBoolean(dataQuestion.results);    //19
      }
    });
}

function desorderPositionArray(array, iter) {               //20   argumento iter que se itera cierto numero de veces
  let random = []                                           //21

  while (random.length < iter) {                            //21 analizar todo esto...

    let positionArray = Math.floor(Math.random() * iter)    //21

    if (!random.includes(array[positionArray])) {           //21
      random.push(array[positionArray])                     //21
    }
  }
  return random                                             //21  ...y esperar
}


function hiddeForm() {                                      //ejecutar en html
  document.getElementById("form-cont").classList.add("dp-none");
}


function changeQuestion() {                                 //24

  getInputsValue()                                          //33 fin

  if (position === dataQuestion.results.length - 1) {       //25 "si la posicion es igual a la posicion final"
    container.style.display = "none"                              // se desaparece el display y sale esto..
    finishSection.innerHTML = `<div class = "finish" style="width: 100%; padding: 100px 0px; text-align: center; font-size: 1.3rem;"><h1 class = "mb">Test finished<br> Score = ${score}</h1><a href="../pages/select.html">Play Again</a></div>`
    return
  }

  position++;                                                             // averiguar que hace
  const typeQuestions = document.getElementById("type").value;            // esto ya esta arriba en el 19
  if (typeQuestions === "multiple") {                                     // esto ya esta arriba en el 19
    container.innerHTML = renderQuestionsTemplate(dataQuestion.results);  // esto ya esta arriba en el 19
  } else {                                                                // esto ya esta arriba en el 19
    container.innerHTML = renderQuestionsBoolean(dataQuestion.results);   // esto ya esta arriba en el 19
  }
  return;

}


function renderQuestionsTemplate(question) {                 //14   argumento question
  var array = question[position].incorrect_answers           //16   array: nombre que se le da al array creado / respuestas en la posicion 0 del arreglo
  array.push(question[position].correct_answer)              //16
  let newOrderQuestion = desorderPositionArray(array, 4)     //22  (array de linea 70, q se iterará en 4 ) / de aqui para abajo...
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

function renderQuestionsBoolean(question) {                   //17  argumento question
  var arraybool = question[position].incorrect_answers        //18  respuestas en la posicion 0 del arreglo
  arraybool.push(question[position].correct_answer)           //18 
  let newOrderQuestion = desorderPositionArray(arraybool, 2)  //23 de aqui para abajo...
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

// ahora vamos a sacar el resultado                           //26
function getInputsValue() {                                   //28
  let answerInput = document.getElementsByTagName("input");   //29 el input sale de los punticos
  answerInput = Array.from(answerInput);                      //30
  answerInput.map(element => {                                //31 que es lo que hace el map?
    if (element.checked) {                                    //32
      if (element.value === dataQuestion.results[position].correct_answer) {  //32
        score = score + 10;                                   //32 arriba para ejecutar
      }
    }
  })
}



