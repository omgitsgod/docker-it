const inquirer = require('inquirer');

const askProject = () => {
  const questions = [
    {
      name: 'project',
      type: 'list',
      message: 'Project type?',
      choices: ['React', new inquirer.Separator(), 'Exit']
    },
  ]

  return inquirer.prompt(questions);
}

const askEnvironment = () => {
  const questions = [
    {
      name: 'env',
      type: 'list',
      message: 'Environment?',
      choices: ['Dev', 'Exit']
    }
  ]

  return inquirer.prompt(questions);
}

module.exports = { askProject, askEnvironment };
