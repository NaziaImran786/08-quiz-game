import inquirer from "inquirer";
//---------------------------------------------------Welcome--------------------------------------------------------
console.clear();
console.log("\t\t---------- Welcome to Quiz game ----------\n");
//----------------------------------------------------variable---------------------------------------------------------
let running = true;
let num_of_question = 0;
let point = 0;
//-------------------------------------------------------api call-----------------------------------------------------
async function quiz() {
    try {
        while (running) {
            let data = await fetch("https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=boolean");
            let obj = await data.json();
            let question = await inquirer.prompt({
                name: "ans",
                type: "confirm",
                message: obj.results[0].question,
            });
            ++num_of_question;
            let api_ans = Boolean(obj.results[0].correct_answer.toLowerCase());
            if (question.ans === api_ans) {
                console.log("Correct answer");
                ++point;
            }
            else {
                console.log("Incorrect answer");
            }
            let confirm = await inquirer.prompt({
                name: "ans",
                type: "confirm",
                message: "Do you want to continue!"
            });
            if (confirm.ans === false) {
                running = false;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    console.log(`\n
        your Correct answare are: ${point}
        your inCorrect answare are: ${num_of_question - point}
        your total point are: ${point} from ${num_of_question}`);
    if ((num_of_question - point) > point) {
        console.log(`\n\t\t😢😢============  Better Luck Next Time  ==========😢😢`);
    }
    else {
        console.log(`\n\t\t🎉🎉=========== weldone you played Excellent ==========🎉🎉`);
    }
    //---------------------------------------------Thank you-------------------------------------------------
    console.log("\n\t\t😊============ Thank you for playing Quiz game ===========😊\n");
}
quiz();
