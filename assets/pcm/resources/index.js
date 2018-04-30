Survey.StylesManager.applyTheme("default");

var choices = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Profesional",
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
                    choices: choices
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
                    title: "Do you knows space and time tradeoffs of the basic data structures, Arrays vs LinkedLists, Able to explain how hashtables can be implemented and can handle collisions, Priority queues and ways to implement them etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q4",
                    title: "Do you know knowledge of advanced data structures like B-trees, binomial and fibonacci heaps, AVL/Red Black trees, Splay Trees, Skip Lists, tries etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q5",
                    title: "Are you able to find the average of numbers in an array?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q6",
                    title: "Do you know sorting, searching and data structure traversal and retrieval algorithms?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q7",
                    title: "Do you know what is Tree, Graph, simple greedy and divide and conquer algorithms, is able to understand the relevance of the levels of this matrix?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q8",
                    title: "Are you able to recognize and code dynamic programming solutions, good knowledge of graph algorithms, good knowledge of numerical computation algorithms, able to identify NP problems etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q9",
                    title: "Do you know what is a compiler, linker or interpreter?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q10",
                    title: "What is your basic knowleage on compilers, linker and interpreters?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q11",
                    title: "Are you understands kernel mode vs. user mode, multi-threading, synchronization primitives and how they're implemented, able to read assembly code. Are you understands how networks work, understanding of network protocols and socket level programming?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q12",
                    title: "Are you understands the entire programming stack, hardware (CPU + Memory + Cache + Interrupts + microcode), binary code, assembly, static and dynamic linking, compilation, interpretation, JIT compilation, garbage collection, heap, stack, memory addressing etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
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
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q14",
                    title: "Do you know what is VSS?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q15",
                    title: "Are you able use CVS and SVN features. Do you knows how to branch and merge, use patches setup repository properties etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q16",
                    title: "Do you know what is distributed VCS systems?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q17",
                    title: "Do you knows how to build from IDE?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q18",
                    title: "Do you knows how to build from the command line?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q19",
                    title: "Do you know how to setup a basic script?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q20",
                    title: "Do you know how to setup a script to build the system and also documentation, installers, generate release notes and tag the code in source control?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q22",
                    title: "Do you know how to write automated unit tests?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q23",
                    title: "Are you able write code in TDD manner?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q24",
                    title: "Are you able to setup automated functional, load/performance and UI tests?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
            ]
        }, {
            title: "Programming",
            questions: [
                {
                    type: "radiogroup",
                    name: "q26",
                    title: "Are you able to break up problem into multiple functions?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q27",
                    title: "Are you able to come up with reusable functions/objects that solve the overall problem?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q28",
                    title: "Are you able to use of appropriate data structures and algorithms and comes up with generic/object-oriented code that encapsulate aspects of the problem?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q29",
                    title: "Are you able to think above the level of a single file/class?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q30",
                    title: "Are you able to break up problem space and design solution as long as it is within the same platform/technology?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q31",
                    title: "Are you able to design systems that span multiple technologies/platforms?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q32",
                    title: "Are you able to visualize and design complex systems with multiple product lines and integrations with external systems. Also should be able to design operations support systems like monitoring, reporting, fail overs etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q35",
                    title: "Are you able to effectively communicate with peers?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q36",
                    title: "Are you able to understand and communicate thoughts/design/ideas/specs in a unambiguous manner and adjusts communication as per the context?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q38",
                    title: "Are you able grouped methods to logically or by accessibility?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q39",
                    title: "Are your code is grouped into regions and well commented with references to other source files?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q40",
                    title: "Are your file has license header, summary, well commented, consistent white space usage? (The file should look beautiful.)",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q42",
                    title: "Are you able grouped related files into a folder?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q43",
                    title: "Are you able divide physical file to a unique purpose, for e.g. one class definition, one feature implementation etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q45",
                    title: "Are you understand problem of everything in one folder?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q46",
                    title: "Do you know how to separate code into logical folders?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q49",
                    title: "Do you know how to understand problem of Mono-syllable names?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q50",
                    title: "Are you albe create a good names for files, variables classes, methods etc?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q53",
                    title: "Do you know how to understand problem of \"Doesn't understand the concept\"?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q54",
                    title: "Are you able checks all arguments and asserts critical assumptions in code?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q55",
                    title: "Do you know how to makes sure to check return values and check for exceptions around code that can fail?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q58",
                    title: "Are you able handle error around code that can throw exceptions/generate errors?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q59",
                    title: "Are you able ensures that error/exceptions leave program in good state, resources, connections and memory is all cleaned up properly?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q60",
                    title: "Are you able codes to detect possible exception before, maintain consistent exception handling strategy in all layers of code, come up with guidelines on exception handling for entire system?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q61",
                    title: "Are you able uses IDE for text editing?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q62",
                    title: "Do you knows their way around the interface, able to effectively use the IDE using menus?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q63",
                    title: "Do you knows keyboard shortcuts in your IDE for most used operations?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q64",
                    title: "Are you able write custom macros in your IDE?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q65",
                    title: "Are you need to look up the documentation frequently?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q68",
                    title: "Do you know how to write libraries that sit on top of the API to simplify frequently used tasks and to fill in gaps in the API?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q70",
                    title: "Are you heard about but not used the popular frameworks available for the platform?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q71",
                    title: "Has used more than one framework in a professional capacity and is well-versed with the idioms of the frameworks?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q75",
                    title: "Has understand complete picture and come up with entire areas that need to be speced?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q76",
                    title: "Are you able to suggest better alternatives and flows to given requirements based on experience?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q77",
                    title: "Do you knows knowledge of scripting tools?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q78",
                    title: "Do you knows batch files/shell scripts?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q79",
                    title: "Do you knows Perl/Python/Ruby/VBScript/Powershell?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q80",
                    title: "Has written and published reusable code?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q81",
                    title: "Do you thinks that Excel is a database?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q82",
                    title: "Do you knows basic database concepts, normalization, ACID, transactions and can write simple selects?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q83",
                    title: "Are you able to design good and normalized database schemas keeping in mind the queries that'll have to be run, proficient in use of views, stored procedures, triggers and user defined types. Knows difference between clustered and non-clustered indexes. Proficient in use of ORM tools?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q84",
                    title: "Do you knows basic database administration, performance optimization, index optimization, write advanced select queries, able to replace cursor usage with relational sql, understands how data is stored internally, understands how indexes are stored internally, understands how databases can be mirrored, replicated etc? Has you understands how the two phase commit works?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
            ]
        }, {
            title: "Experience",
            questions: [
                {
                    type: "radiogroup",
                    name: "q85",
                    title: "Do you knows what is \"Imperative\" or \"Object Oriented\" programming?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q86",
                    title: "Do you knows difference between static vs dynamic typing, weak vs strong typing and static inferred types?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q87",
                    title: "Do you understand lazy evaluation, currying, continuations?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q88",
                    title: "Do you knows Concurrent (Erlang, Oz) and Logic (Prolog)?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q92",
                    title: "Have you worked on at least one product in the domain?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q93",
                    title: "Have you worked on multiple products in the same domain?.",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q94",
                    title: "Have you designed and implemented several products/solutions in the domain, well versed with standard terms, with protocols used in the domain?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
            ]
        }, {
            title: "Knowledge",
            questions: [
                {
                    type: "radiogroup",
                    name: "q96",
                    title: "Knows about some alternatives to popular and standard tools?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q97",
                    title: "Do you knows good knowledge of editors, debuggers, IDEs, open source alternatives etc.?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q98",
                    title: "Has you wrote tools and scripts?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q104",
                    title: "Do you knows basic knowledge of the code layout and how to build the system?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q105",
                    title: "Has you good knowledge of code base, has implemented several bug fixes and maybe some small features?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q106",
                    title: "Has you implemented multiple big features in the codebase and can easily visualize the changes required for most features or bug fixes?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q107",
                    title: "Have you heard of the upcoming technologies?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q112",
                    title: "Have you basic knowledge of how the platform works internally?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q113",
                    title: "Have you deep knowledge of platform internals and can visualize how the platform takes the program and converts it into executable code?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q116",
                    title: "Have you read book: Code Complete, Don't Make me Think, Mastering Regular Expressions?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q117",
                    title: "Have you read book: Design Patterns, Peopleware, Programming Pearls, Algorithm Design Manual, Pragmatic Programmer, Mythical Man month?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q119",
                    title: "Do you knows what is \"Blog\"?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q120",
                    title: "Do you reads tech/programming/software engineering blogs and listens to podcasts regularly?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
                },
                {
                    type: "radiogroup",
                    name: "q121",
                    title: "Has you write blog with some collection of useful articles and tools that he/she has collected?",
                    isRequired: true,
                    colCount: 1,
                    choices: choices
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
            var data = result.data;
            var matrix = {
                "Beginner": {"value":1, "min":0, "max":118, "next":"Intermediate"},
                "Intermediate": {"value":2, "min":119, "max":235, "next":"Advanced"},
                "Advanced": {"value":3, "min":236, "max":353, "next":"Profesional"},
                "Profesional": {"value":4, "min":356, "max":496, "next":"Profesional"}
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
                            msg = "Nice, you are ";
                            level = key;
                        } else {
                            var msg = "You have to work harder, if you want to be ";
                            if( percent(matrix[key].max, maxScore) <= 50  ) {
                                level = matrix[key].next;
                                msg = "You are so close, if you want to be ";
                            } 
                            
                            document
                            .querySelector('#surveyResult')
                            .innerHTML = "<h1><center>" + msg + level + "</center></h1>";
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
                "satisfaction": "4",
                "Quality": {
                    "does what it claims": "1"
                },
                "recommend friends": "3",
                "price to competitors": "More expensive",
                "price": "correct",
                "pricelimit": {
                    "mostamount": ""
                }
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
}, 300000);
$("#surveyElement").Survey({model: survey});
