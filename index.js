'use strict';

let questionNumber = 0;
let elonsCollected = 0;

function generateStartScreen() {
  return `
  <section id='startScreen'>
  <p>There are 10 questions in total. You get 1 Elon for each correct answer. Neat Huh?</p>
          <p>Let the mildly entertaining trivia commence!</p>
        
          <button id="start-button" type="button" autofocus>Start Quiz</button>
          </section>`;
}

function generateQuestionScreen() {
  const currentQuestion = BANK[questionNumber];
  return `<section id="questionScreen">
        
          <form id="answerChoices">
            <fieldset>
              <legend><span id='questionText'>${currentQuestion.question}</span></legend>
              
                  <label for='answerChoice1' class="answer">
                    <input id='answerChoice1'  type='radio'  name='question' required autofocus>
                    <span class="answer">${currentQuestion.answers[0]}</span>
                  </label>
                
               
                  <label for='answerChoice2' class="answer">
                    <input id='answerChoice2'  type='radio'  name='question' required >
                    <span class="answer">${currentQuestion.answers[1]}</span>
                  </label>
                
                
                  <label for='answerChoice3' class="answer">
                    <input id='answerChoice3'  type='radio'  name='question' required >
                    <span class="answer">${currentQuestion.answers[2]}</span>
                  </label>
                
                
                  <label for='answerChoice4' class="answer">
                    <input id='answerChoice4'  type='radio'  name='question' required aria-required="true">
                    <span class="answer">${currentQuestion.answers[3]}</span>
                  </label>
                
            </fieldset>
          </form>
          <button id="submit-button" type="submit" form='answerChoices' value='submit'> Submit Answer</button>
          </section>`;
}

function generateCorrectScreen() {
  
  return `<section id="correctScreen">
          <p> Nicely done!</p>
          <p>You've earned an Elon!</p>
          <image       src='https://amp.businessinsider.com/images/579077f288e4a727008b9ae7-960-720.jpg' alt='Cartoon image of Elon Musk from BusinessInsider.com' class='elonPicture'>
          <button id="continue-button" type="button" autofocus>Continue</button>
          </section>`;
}

function generateIncorrectScreen() {
  return `<section id="incorrectScreen">
          <p>Oopsies!</p>
          <p>That's not quite right.</p>
          <p>The correct answer is </p>
          <p><span id='correctAnswer'>${BANK[(questionNumber - 1)].correctAnswer}</span></p>
          
          <button id="continue-button" type="button" autofocus>Continue</button>
          </section>`;
}


function generateFinalScreen() {
  return `<section id="finalScreen">
          <p>Thanks for taking the SpaceX Quiz</p>
          <p>Looks like you collected <span id="numberElons">${elonsCollected}</span> Elons out of 10!</p>
          <p>Would you like to try again?</p>
          
        
          <button id="restart-button" type="button" autofocus>Try Again</button>
          </section>`;
}

function renderQuiz(item) {
  $('#render').html(item);
}

function selected() {
  $(this).click(function() {
    $(this).addClass('selected')
  });
}

function handleStartClick() {
  $('#render').on('click', '#start-button',  function(){
    $('#hide').addClass('hide');
    $(nextQuestion);
    renderQuiz(generateQuestionScreen());
  });
}

function nextQuestion() { 
  questionNumber++;
  $('#questionNumber').html(questionNumber);
}

function increaseScore() {
  elonsCollected++;
  $('#elonsCollected').html(elonsCollected);
}

function selectAnswer() {
  $("input[name='question']:checked").closest('label').addClass('selected');
}

function handleLabelAnswerClick() {
   $('#render').on('click','label', function() {
     $('label').removeClass("selected");
   $(this).click(selectAnswer());});
}

function handleSubmitAnswerClick() {  
  $('#render').submit('#answerChoices',function(event){
    event.preventDefault();
    let currentQuestion = BANK[(questionNumber - 1)];
    //finds what the user has selected and returns a string value of that choice
    let userAnswer = $("input[name='question']:checked").closest('label').find('span').text();
    if(userAnswer === currentQuestion.correctAnswer){
      renderQuiz(generateCorrectScreen());
      $(increaseScore);
    } else {
      renderQuiz(generateIncorrectScreen());
    }
  });
}

function handleContinueClick() {
  $('#render').on('click','#continue-button', function(){
    if(questionNumber < 10){
      renderQuiz(generateQuestionScreen());
      $(nextQuestion);
    } else if(questionNumber === 10) {
      renderQuiz(generateFinalScreen());
    }
  });
}

function handleRetryQuizClick() {
  $('#render').on('click', '#restart-button', function(){
    questionNumber = -1;
    elonsCollected = -1;
    $(nextQuestion);
    $(increaseScore);
    $('#hide').removeClass('hide'); 
    renderQuiz(generateStartScreen());
    });
}

function handleQuizApp() {
  renderQuiz(generateStartScreen());
  handleStartClick();
  handleLabelAnswerClick();
  handleSubmitAnswerClick();
  handleContinueClick();
  handleRetryQuizClick();
}

$(handleQuizApp);