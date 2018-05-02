Survey.StylesManager.applyTheme("default");

var choices = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Profesional"
];
//var choices_alt = choices;

var choices_alt = [
    "I don't know what your talking about",
    "I heard about it",
    "Yes",
    "Of course, no problem"
];

var json = {
    //title: "Programmer Competency Matrix",
    pages: [
        {
            title: "Computer Science",
            questions: [
                {
                    type: "radiogroup",
                    name: "q1",
                    title: "Do you know the difference between Array and LinkedList?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q2",
                    title: "Are you able to explain and use Arrays, LinkedLists, Dictionaries etc in practical programming tasks?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q3",
                    title: "Are you able to explain how hashtables can be implemented and can handle collisions, priority queues and ways to implement them etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q4",
                    title: "Do you know advanced data structures like B-trees, binomial and fibonacci heaps, AVL/Red Black trees, Splay Trees, Skip Lists, tries etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q5",
                    title: "Are you able to find the average of numbers in an array?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q6",
                    title: "Do you know sorting, searching and data structure traversal and retrieval algorithms?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q7",
                    title: "Do you know what is Tree, Graph, simple greedy and divide and conquer algorithms, are you able to understand the relevance of the levels of this matrix?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q8",
                    title: "Are you able to recognize and code dynamic programming solutions, graph algorithms, " +
                    "numerical computation algorithms and be able to identify NP problems?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q9",
                    title: "Do you know what is a compiler, linker or interpreter?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q10",
                    title: "What is your basic knowleage on compilers, linker and interpreters?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q11",
                    title: "Do you understand kernel mode vs. user mode, multi-threading, synchronization primitives and how they're implemented?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q12",
                    title: "Do you understand the entire programming stack: hardware (CPU + Memory + Cache + Interrupts + microcode), binary code, assembly, static and dynamic linking, compilation, interpretation, JIT compilation, garbage collection, heap, stack, memory addressing etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
            ]
        }, {
            title: "Software Engineering",
            questions: [
                {
                    type: "radiogroup",
                    name: "q13",
                    title: "Are you able backup folder by date?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q14",
                    title: "Do you know what is VSS?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q15",
                    title: "Are you able to use CVS and SVN features (branch, merge, use patches, repository properties, ...)?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q16",
                    title: "Do you know what distributed VCS systems are?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q17",
                    title: "Do you know how to build source code from IDE?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q18",
                    title: "Do you know how to build source code from the command line?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q19",
                    title: "Do you know how to setup a basic script?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q20",
                    title: "Do you know how to setup a script, build the system, write documentation, create installers, generate release notes and tag the code in source control?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q22",
                    title: "Do you know how to write automated unit tests?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q23",
                    title: "Are you able to write code in TDD (test driven development) manner?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q24",
                    title: "Are you able to setup automated functional, load/performance and UI tests?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
            ]
        }, {
            title: "Programming",
            questions: [
                {
                    type: "radiogroup",
                    name: "q26",
                    title: "Are you able to break up problem (eg big/long function) into multiple small functions?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q27",
                    title: "Are you able to come up with reusable functions/objects that solve the overall problem?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q28",
                    title: "Are you able to use appropriate data structures and algorithms and comes up with generic/object-oriented code that encapsulate aspects of the problem?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q29",
                    title: "Are you able to recognize the level of a single file/class (during create class, refactoring, ...)?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q30",
                    title: "Are you able to break up problem space and design solution as long as it is within the same platform/technology?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q31",
                    title: "Are you able to design systems that span multiple technologies/platforms?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q32",
                    title: "Are you able to visualize and design complex systems with multiple product lines and integrations with external systems?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q35",
                    title: "Are you able to effectively communicate with peers?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q36",
                    title: "Are you able to understand and communicate thoughts/design/ideas/specs in a unambiguous manner and adjusts communication as per the context?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q38",
                    title: "Are you able to group functions/methods acording to logic?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q40",
                    title: "Does your source code file consist of license in header, summary, commented functions: separated by empty lines?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q42",
                    title: "Are you able to group related files into a folder?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q43",
                    title: "Are you able to divide physical file acording to unique purpose?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q46",
                    title: "Do you know how to separate source code files into logical folders?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q49",
                    title: "Do you know how to solve problem of Mono-syllable names?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q50",
                    title: "Do you create good/descriptive names for files, variables classes, methods etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: [
                        "Who cares about names",
                        "I use default names",
                        "I try to be descriptive but, when looking back, I know it could be better",
                        "The name is very important: should be descriptive and simple. I discuss it with others"
                    ]
                },
                {
                    type: "radiogroup",
                    name: "q58",
                    title: "Are you able to handle error that can throw exceptions/generate errors?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q61",
                    title: "Are you able to use IDE for text editing?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q63",
                    title: "Do you know keyboard shortcuts in your IDE for most used operations?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q64",
                    title: "Are you able to write custom macros in your IDE?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q65",
                    title: "Do you need to look in to the documentation frequently?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q68",
                    title: "Do you know how to write libraries that are on the top of the API?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q71",
                    title: "Are you using more than one framework?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q78",
                    title: "Are you using batch files/shell scripts?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q79",
                    title: "Do you know Perl/Python/Ruby/VBScript/Powershell?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q81",
                    title: "Do you thinks that Excel is a database?",
                    isRequired: true,
                    colCount: 1,
                    choices: [
                        "yes",
                        "no"
                    ]
                },
                {
                    type: "radiogroup",
                    name: "q82",
                    title: "Do you know database concepts?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q84",
                    title: "Do you use database administration: performance optimization, index optimization, queries,...?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
            ]
        }, {
            title: "Experience",
            questions: [
                {
                    type: "radiogroup",
                    name: "q85",
                    title: "Do you know what \"Imperative\" or \"Object Oriented\" programming is?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q86",
                    title: "Do you know the difference between static and dynamic types?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q87",
                    title: "Do you understand lazy evaluation?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q93",
                    title: "Have you worked on multiple products in the same domain?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
            ]
        }, {
            title: "General overview",
            questions: [
                {
                    type: "radiogroup",
                    name: "q107",
                    title: "Are you interested the upcoming technologies?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q112",
                    title: "How important is the functioning of the platform, you work with to you?",
                    isRequired: true,
                    colCount: 1,
                    choices: [
                        "I don't care about platform",
                        "I heard about the platform, but it's not my business",
                        "I know how it works",
                        "I know how it works, and I can extend it"
                    ]
                },
                {
                    type: "radiogroup",
                    name: "q116",
                    title: "Do you read books, eg.: Code Complete, Don't Make me Think, Mastering Regular Expressions?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q117",
                    title: "Do you read books, eg.: Design Patterns, Peopleware, Programming Pearls, Algorithm Design Manual, Pragmatic Programmer, Mythical Man month?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q124",
                    title: "Do you visit, eg.: reddit.com, news.ycombinator.com, lobste.rs, theverge.com?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q119",
                    title: "Do you know what what \"Github\" is?",
                    isRequired: true,
                    colCount: 1,
                    choices: [
                        "I don't know what it is",
                        "I heard about it",
                        "I have account but I don't contribute regulary",
                        "I contribute regulary (currently I working on new issues)"
                    ]
                },
                {
                    type: "radiogroup",
                    name: "q122",
                    title: "Do you know who is \"Uncle Bob\"?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q123",
                    title: "What dou you think about \"Open Source\"?",
                    isRequired: true,
                    colCount: 1,
                    choices: [
                        "I don't know what it is",
                        "I heard about it, but I don't care",
                        "I see its potencial, but I won't share my knowledge for free",
                        "There is nothing better then sharing of experience and knowledge"
                    ]
                },
                {
                    type: "radiogroup",
                    name: "q120",
                    title: "Do you read tech/programming/software engineering blogs and listens to podcasts regularly?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                },
                {
                    type: "radiogroup",
                    name: "q121",
                    title: "Do you write blog with some collection of useful articles and tools that he/she has collected?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices_alt
                }
            ]

//        }, {
//            questions: [
//                {
//                    type: "text",
//                    name: "email",
//                    title: "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button."
//                }
//            ]
        }
    ]
};

function percent(oldNumber, newNumber){
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
}

window.survey = new Survey.Model(json);
survey
        .onComplete
        .add(function (result) {
            //var data = JSON.stringify(result.data);

            $('html,body', window.parent.document).animate({
                scrollTop: window.parent.$("#test-your-own-skills").offset().top
            });
            $('.sv_body.sv_completed_page h3').hide();

            var v = {
                e: 0,
                a: 113,
                b: 226,
                c: 339,
                d: 455
            };

            var data = result.data;
            var matrix = {
                "Beginner": {"value":1, "min":v.e, "max":v.a, "next":"Intermediate"},
                "Intermediate": {"value":2, "min":v.a, "max":v.b, "next":"Advanced"},
                "Advanced": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "Profesional": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"},

                "I don't know what your talking about": {"value":1, "min":v.e, "max":v.a, "next":"Intermediate"},
                "I heard about it": {"value":2, "min":v.a, "max":v.b, "next":"Advanced"},
                "Yes": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "Of course, no problem": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"},

                "I don't know what it is": {"value":1, "min":v.e, "max":v.a, "next":"Intermediate"},
                "I heard about it, but I don't care": {"value":2, "min":v.a, "max":v.b, "next":"Advanced"},
                "I see its potencial, but I won't share my knowledge for free": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "There is nothing better then sharing of experience and knowledge": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"},

                "I heard about it": {"value":2, "min":v.a, "max":v.b, "next":"Advanced"},
                "I have account but I don't contribute regulary": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "I contribute regulary (currently I working on new issues)": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"},

                "I don't care about platform": {"value":1, "min":v.e, "max":v.a, "next":"Intermediate"},
                "I heard about the platform, but it's not my business": {"value":2, "min":v.a, "max":v.b, "next":"Advanced"},
                "I know how it works": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "I know how it works, and I can extend it": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"},

                "Who cares about names": {"value":1, "min":v.e, "max":v.a, "next":"Intermediate"},
                "I use default names": {"value":2, "min":v.a, "max":v.b, "next":"Advanced"},
                "I try to be descriptive but, when looking back, I know it could be better": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "The name is very important: should be descriptive and simple. I discuss it with others": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"},

                "yes": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"},
                "no": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "Beginner": {"value":1, "min":v.e, "max":v.a, "next":"Intermediate"},
                "Intermediate": {"value":2, "min":v.a, "max":v.b, "next":"Advanced"},
                "Advanced": {"value":3, "min":v.b, "max":v.c, "next":"Profesional"},
                "Profesional": {"value":4, "min":v.c, "max":v.d, "next":"Profesional"}
            };

            var maxScore = 0;
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    maxScore += parseInt(matrix[data[key]].value);
                }
            }

            for (var key in matrix) {
                if (matrix.hasOwnProperty(key)) {     
                    if(maxScore >= matrix[key].min && maxScore <= matrix[key].max) {
                        var level = matrix[key].next;
                        if( maxScore >= matrix["Profesional"].min ) {
                            msg = "Nice, you are <br> ";
                            level = "Profesional";
                        } else {
                            var msg = "You have to work harder,<br> if you want to be ";
                            if( percent(matrix[key].max, maxScore) <= 50  ) {
                                level = matrix[key].next;
                                msg = "You are so close,<br> if you want to be ";
                            } 
                            
                            var p = Math.round((maxScore / matrix[key].max) * 100);

                            document
                            .querySelector('#surveyResult')
                            .innerHTML = "<br>" + 
                                         "<h3><center>You reached:</center></h3>" +
                                         "<h1><center style='color:#022b6d; font-weight:bold; font-size: 85px'>" + p + "%</center></h1>" + 
                                         "<h3><center>" + msg + level + "</center></h3>"
                            ;
                        }
                    }
                }
            }


        });
var storageName = "SurveyJS_LoadState";
var timerId = 0;
function loadState(survey) {
    //Here should be the code to load the data from your database
    var storageSt = window
            .localStorage
            .getItem(storageName) || "";
    var res = {};
    if (storageSt)
        res = JSON.parse(storageSt); //Create the survey state for the demo. This line should be deleted in the real app.
    else
        res = {
            currentPageNo: 0,
            data: {

            }
        };
    //Set the loaded data into the survey.
    if (res.currentPageNo)
        survey.currentPageNo = res.currentPageNo;
    if (res.data)
        survey.data = res.data;
}

function saveState(survey) {
    var res = {
        currentPageNo: survey.currentPageNo,
        data: survey.data
    };
    //Here should be the code to save the data into your database
    window
            .localStorage
            .setItem(storageName, JSON.stringify(res));
}

survey
        .onCurrentPageChanged
        .add(function (survey, options) {
            saveState(survey);
        });
survey
        .onComplete
        .add(function (survey, options) {
            //kill the timer
            clearInterval(timerId);
            //save the data on survey complete. You may call another function to store the final results
            saveState(survey);
        });

//Load the initial state
loadState(survey);
//save the data every x seconds
timerId = window.setInterval(function () {
    saveState(survey);
}, 600000);

$("#surveyElement").Survey({model: survey});
