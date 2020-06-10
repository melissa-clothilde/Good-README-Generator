const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide your detailed project description."
        },
        {
            type: "input",
            name: "installation",
            message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running."
        },
        {
            type: "input",
            name: "usage",
            message: "Provide instructions and examples for use."
        },
        {
            type: "input",
            name: "license",
            message: "Provide a license name."
        },
        {
            type: "input",
            name: "contributors",
            message: "Provide contributors."
        },
        {
            type: "input",
            name: "tests",
            message: "Write tests for your application. Then provide examples on how to run them."
        },
        {
            type: "input",
            name: "username",
            message: "What is your github username"
        },
        {
            type: "input",
            name: "question2",
            message: "What is your github email?"
        },
    ])
    .then(async function (answers) {
        const {username} = answers;
        const queryUrl = `https://api.github.com/users/${username}`;
        console.log(queryUrl);
        const res = await axios.get(queryUrl);
        console.log("res", res);
        answers.avatar = res.data.avatar_url;
        return answers;
    });
}

function generateMarkdown(answers) {
    return `
    # ${answers.title}
    ## Description
    ${answers.description}
    ## Table of Contents
    * [Installation](#installation) 
    * [Usage](#usage) 
    * [Credits](#credits) 
    * [License](#license) 
    * [Contributors](#contributors) 
    ## Installation 
    ${answers.installation} 
    ## Usage 
    ${answers.usage} 
    ## License 
    ${answers.license}
    ## Contributors 
    ${answers.contributors} 
    ## Tests 
    ${answers.tests} 
    ## Questions

    ![profile](${answers.avatar}) 
    
    ${answers.question2}`;
}

module.exports = generateMarkdown;

async function init() {

    try {
        const answers = await promptUser();
        console.log("answers", answers);
        const markdown = generateMarkdown(answers);

        await writeFileAsync("generatedREADME.md", markdown);

        console.log("Successfully wrote to generatedREADME.md");
    } catch (err) {
        console.log(err);
    }
}

init();
