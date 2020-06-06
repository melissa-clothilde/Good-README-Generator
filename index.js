const inquirer = require("inquire");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser () {
    return inquirer.prompt([
        {
            type: "input",
            username: "name",
            message: "What is your GitHub username?"
        },
        {

        }
    ]);
}

function generatMD(answers) {
    return `
 
  }

function generateMD()
async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("generatedREADME.md", html);

    console.log("Successfully wrote to index.html");
  } catch(err) {
    console.log(err);
  }
}

init();