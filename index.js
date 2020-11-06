const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");


/////////////////////////////////////////////////////////////////////////////////////
//                Questions Object Array
////////////////////////////////////////////////////////////////////////////////////

const responses = [
    { type: "input", message: "What's your Github user name?", name: "username" },
    { type: "input", message: "What is the name of your Github repo?", name: "repo" },
    { type: "input", message: "What is your email address?", name: "email" },
    { type: "input", message: "What is the title of your project?", name: "title" },
    { type: "input", message: "Can you describe your project in a few words?", name: "description" },
    { type: "input", message: "What are the installation instructions for your project?", name: "install" },
    { type: "input", message: "How will your project be used? (Usage section)", name: "usage" },
    { type: "input", message: "What advices would you like to give to future project contributors?", name: "contribute" },
    { type: "input", message: "What tests have you included in your project?", name: "tests" },
    { 
      type: "list", message: "Select a project licence", 
      choices: ['GNU AGPLv3',"Mozilla Public License","Apache License","MIT License","Boost Software License","The Unlicense"],
      name: "license"
    }
  ]

/////////////////////////////////////////////////////////////////////////////////////
//                Log Response Function
////////////////////////////////////////////////////////////////////////////////////
function printResponses(responses) {
  console.log(`
Username: ${responses.username}
Repo: ${responses.repo}
Email: ${responses.email}
Description: ${responses.description}
Installation instructions: ${responses.install}
Usage details: ${responses.usage}
Guidance for contributors: ${responses.contribute}
Tests: ${responses.tests}
License: ${responses.license}
`);
}



  /////////////////////////////////////////////////////////////////////////////////////
  //                Create README Function
  ////////////////////////////////////////////////////////////////////////////////////

  function createReadMe(CLIOutput) {
    let readMeContents = `## Table of Contents`;
    if (CLIOutput.installation !== '') { readMeContents += `
    * [Installation](#installation)` };
    if (CLIOutput.usage !== '') { readMeContents += `
    * [Usage](#usage)` };
    if (CLIOutput.contributing !== '') { readMeContents += `
    * [Contributing](#contributing)` };
    if (CLIOutput.tests !== '') { readMeContents += `
    * [Tests](#tests)` };
    let readMeBody = 
    `# ${CLIOutput.title}
    ![Badge for Github project license](https://img.shields.io/badge/license-${CLIOutput.license}-brightgreen)
    ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${CLIOutput.username}/${CLIOutput.repo}?style=flat&logo=appveyor) 
    
    Get your own super sweet badges from [shields.io](https://shields.io/).
    
    
    ## Description 
    
    *The what, why, and how:* 
    
    ${CLIOutput.description}

    `

    readMeBody += readMeContents;
    readMeBody += `
    * [License](#license)`;

    if (CLIOutput.installation !== '') {
    readMeBody +=
    `
    
    ## Installation
    
    *Steps required to install project and how to get the development environment running:*
    
    ${CLIOutput.install}
    
    `
    };
    
    if (CLIOutput.usage !== '') {
    readMeBody +=
    `
    
    ## Usage 
    
    *Instructions and examples for use:*
    
    ${CLIOutput.usage}
    `
    };
    
    if (CLIOutput.contributing !== '') {
    readMeBody +=
    `
    
    ## Contributing
    
    *If you would like to contribute it, you can follow these guidelines for how to do so.*
    
    ${CLIOutput.contributing}
    `
    };

    if (CLIOutput.tests !== '') {    
    readMeBody +=
    `
    
    ## Tests
    
    *Tests for application and how to run them:*
    
    ${CLIOutput.tests}
    `
    };
  
    readMeBody +=
    `
    
    ## License
    
    ${CLIOutput.license}
    `;

    if (CLIOutput.email !== null) {
    
    readMeBody +=
    `
    ---
    
    ## Questions?
    
    Check out and connect with me via my Github bio at [shields.io](https://github.it/${CLIOutput.username})

    You can reach me via email at ${CLIOutput.email}
    `};
 
    return readMeBody;    
  }

  /////////////////////////////////////////////////////////////////////////////////////
  //                Write to File Function & Async Function
  ////////////////////////////////////////////////////////////////////////////////////

  function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
      if (err) {
        return console.log(err);
      }
    
      console.log("Way to go, you made a README file! Open it up and take a look...")
  });
  }
  
  const writeFileAsync = util.promisify(writeToFile);


  /////////////////////////////////////////////////////////////////////////////////////
  //               Initializing Function to Begin Program
  ////////////////////////////////////////////////////////////////////////////////////
  async function init() {
    try {
      const CLIOutput = await inquirer.prompt(responses);
      await printResponses(CLIOutput);
      const newReadMe = await createReadMe(CLIOutput);
      await writeFileAsync('sampleREADME.md', newReadMe);
    }
    catch (error) {
      console.log(error);
    }
  }
    
  
init();

