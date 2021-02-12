const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');

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
        message: 'Enter your Github username (Required)',
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
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an about section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself',
        when: ({ confirmAbout }) => {
          if(confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
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
  return inquirer.prompt([
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
      name: 'linkRepo',
      message: "Enter the url of your project's Github repository. (Required)",
      validate: nameInput => {
        if(nameInput) {
          return true;
        } else {
          console.log("Please enter a link to your project's repository.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'linkSite',
      message: "Enter the project's live url. (Required)",
      validate: nameInput => {
        if(nameInput) {
          return true;
        } else {
          console.log("Please enter a link to your live web application.");
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
  ])
  .then(projectData => {
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
    return generatePage(portfolioData);
  })
  .then(pageHtml => {
    return writeFile(pageHtml);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => console.log(err));