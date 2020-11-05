//  quiz object
function Quiz(questions) {
    this.jim = 0;
    this.dwight = 0;
    this.michael = 0;
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
    return this.questionsIndex === this.questions.length;
}

// function to capture text, choices, answers to populate
function Question(text, choice, answers) {
    this.text = text;
    this.choice = choice;
    this.answers = answers;
};

// based on answer, add count to respective character
Question.prototype.answer = function(choice) {
    if (choice === "choice-0") {
        return this.jim++;
    }
    else if (choice === "choice-1") {
        return this.dwight++;
    }
    else {
        return this.michael++;
    }
    this.questionIndex++;
}

// populate the quiz
function populate() {
    if (quiz.isEnded()) {
        showResult();
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
    var highestScore = Math.max(this.jim, this.dwight, this.michael);
    var quizOver = "<h2>Result</h2>";
    quizOver += "<h3> Your Score : " + highestScore +"</h3>";
    var element = document.getElementById("quiz")
    element.innerHTML = quizOver;
};




// Create Questions here
var questions = [
    new Question("If you were to pick one of the items at a resturant, which one would you choose?",
     ["Ham & Cheese Sandwhich",
     "Beet Salad",
     "Chicken Breast Hold the Chicken"]),
    new Question("What's your relationship with your coworkers?", 
    ["We're all friendly",
    "Coworkers? These idiots just share the same working space. They'll all bow down to me one day.",
    "These people? These people are like my best friends, they love me I love them."]),
    new Question("How would you spend your day off?",
    ["Take my wife out for a nice relaxing day",
    "Spend it on my farm preparing for the season",
    "Oh I don't know, probably scoping out the scene for my next lover, y'know cause I have so many"]),
    new Question("What's your coffee order?",
    ["Just a regular coffee with cream",
    "Coffee? I am a superior human. Coffee is for the weak",
    "No Coffee just milk and sugar"
    ])
];

// create quiz
var quiz = new Quiz(questions);

// populate
populate();