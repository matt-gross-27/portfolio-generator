const inquirer = require('inquirer');
const fs = require('fs');
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


// UNCOMMENT ME START
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw err;
      console.log('Portfolio complete! Check out index.html to see the output!');
    });
  });
// UNCOMMENT ME END





// DELETE ME START
// let mockData = 
// {
//   nombre: 'Lernantino',
//   github: 'lernantino',
//   confirmAbout: true,
//   about:
//     'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//   projects: [
//     {
//       nombre: 'Run Buddy',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['HTML', 'CSS'],
//       linkRepo: 'https://github.com/lernantino/run-buddy',
//       feature: true,
//       confirmAddProject: true
//     },
//     {
//       nombre: 'Taskinator',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['JavaScript', 'HTML', 'CSS'],
//       linkRepo: 'https://github.com/lernantino/taskinator',
//       linkSite: 'https://lernantino.github.io/taskinator',
//       feature: true,
//       confirmAddProject: true
//     },
//     {
//       nombre: 'Taskmaster Pro',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//       linkRepo: 'https://github.com/lernantino/taskmaster-pro',
//       linkSite: 'https://lernantino.github.io/taskmaster-pro',
//       feature: false,
//       confirmAddProject: true
//     },
//     {
//       nombre : 'Robot Gladiators',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//       languages: ['JavaScript'],
//       linkRepo: 'https://github.com/lernantino/robot-gladiators',
//       linkSite: 'https://lernantino.github.io/robot-gladiators',
//       feature: false,
//       confirmAddProject: false
//     }
//   ]
// };

// const pageHTML = generatePage(mockData);
// fs.writeFile('./index.html', pageHTML, err => {
//         if (err) throw err;
//         console.log('Portfolio complete! Check out index.html to see the output!');
//       })
// DELETE ME END