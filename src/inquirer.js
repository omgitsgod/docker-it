const inquirer = require('inquirer');

const askPackage = async () => {

  const questions = [
    {
      name: 'package',
      type: 'list',
      message: 'Package type?',
      choices: ['yarn', 'npm', new inquirer.Separator(), 'Exit'],
    },
  ];

  const { package } = await inquirer.prompt(questions)

  if (package === 'Exit') process.exit()
  
  return package
}

const askProject = async () => {

  const questions = [
    {
      name: 'project',
      type: 'list',
      message: 'Project type?',
      choices: ['React', new inquirer.Separator(), 'Exit']
    },
  ]

  const { project } = await inquirer.prompt(questions);

  if (project === 'Exit') process.exit();

  return project;
}

const askEnvironment = async () => {

  const questions = [
    {
      name: 'env',
      type: 'list',
      message: 'Environment?',
      choices: ['Dev', new inquirer.Separator(), 'Exit']
    }
  ]

  const { env } = await inquirer.prompt(questions);

  if (env === 'Exit') process.exit();

  return env;
}

module.exports = { askPackage, askProject, askEnvironment };
