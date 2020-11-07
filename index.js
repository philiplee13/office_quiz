//  quiz object
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
};

// we use "prototype" here to inherit the properties of the quiz object
// get question index
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

//  check to see if quiz has ended
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

// Quiz add to score for each person
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score ++;
    }
    this.questionIndex++;
}

// function to capture text, choices, answers to populate
function Question(text, choice, answers) {
    this.text = text;
    this.choice = choice;
    this.answers = answers;
};

// Save user input into choice
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answers === choice;
}
// populate the quiz
// If finished, show the result and the reset button
// If not, show next question and button
function populate() {
    if (quiz.isEnded()) {
        showResult();
        var fullReset = document.getElementById("quiz-reset");
        fullReset.style.display = "block";
        fullReset.addEventListener("click",function () {
            location.reload();
        }, false);
    }
    else {
        // show the question
        var element = document.getElementById("questions");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choice = quiz.getQuestionIndex().choice;
        for (var i = 0; i < choice.length; i++) {
            var element = document.getElementById("choice-" + i);
            element.innerHTML = choice[i];
            guess("option-" + i, choice[i]);
        }
        showProgress();
    }

};

// define guess();
function guess(id,guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

// define showProgress();
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("question-tracker");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;

};

// define showResult();

function showResult() {
    var quizOver = "<h2>Final result</h2>";
    quizOver += "<h3> Your Score : " + quiz.score +"</h3>";
    var element = document.getElementById("quiz")
    element.innerHTML = quizOver;
};

// Create Questions here
var questions = [
    new Question("What did Jim eat once in front of Andy?",
     ["A tuna sandwich",
     "A pony sandwich",
     "Chicken Breast Hold the Chicken"],
     "A tuna sandwich"),
    new Question("In the pilot episode, how long did Michael say he was working Dunder Mifflin?", 
    ["10 years",
    "15 years",
    "12 years"],
    "12 years"),
    new Question("What does Todd Packer's license plate say?",
    ["WLHUNG",
    "TODPACK",
    "BIGB@LLS"],
    "WLHUNG"),
    new Question("What item of Andy's did Jim put in jello?",
    ["A mug",
    "A stapler",
    "A calculator"],
    "A calculator")
];

// create quiz
var quiz = new Quiz(questions);

// populate
populate();