const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(nombre, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;
//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
  return inquirer.prompt(
    [
      {
        type: 'input',
        name: 'nombre',
        message: 'What is your name? (Required)',
        validate: nameInput => {
          if(nameInput) {
            return true;
          } else {
            console.log('Please enter your name.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your Github username (required)',
        validate: nameInput => {
          if(nameInput) {
            return true;
          } else {
            console.log('Please enter your username.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself'
      }
    ]
  );
};

const promptProject = (portfolioData) => {
  if(!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
=================
Add a New Project
=================
`);
  return inquirer.prompt(
    [
      {
        type: 'input',
        name: 'nombre',
        message: 'What is the name of your project',
        validate: nameInput => {
          if(nameInput) {
            return true;
          } else {
            console.log("Please enter your project's name.");
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['HTML', 'CSS', 'Bootstrap', 'Foundation', 'JavaScript', 'ES6', 'jQuery', 'Moment', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the Github link to your project. (Required)',
        validate: nameInput => {
          if(nameInput) {
            return true;
          } else {
            console.log("Please enter the url of your project's Github repository.");
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ]
  ).then(projectData => {
    portfolioData.projects.push(projectData);
    if(projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }

  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

  