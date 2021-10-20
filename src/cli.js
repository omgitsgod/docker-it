const chalk = require('chalk');
const figlet = require('figlet');
const hasbin = require('hasbin');
const { askProject, askEnvironment } = require('./inquirer');
const { buildProject } = require('./builds')

const run = async () => {
  const dockerIsInstalled = hasbin.sync('docker')
  const dockerComposeIsInstalled = hasbin.sync('docker-compose')
  console.log(
    chalk.yellow(figlet.textSync('docker-it', { horizontalLayout: 'full' }))
  );
  console.log(`docker: ${dockerIsInstalled ? chalk.green('installed') : chalk.red('not installed')}`)
  console.log(`docker-compose: ${dockerComposeIsInstalled ? chalk.green('installed') : chalk.red('not installed')}`);

  const { project } = await askProject();
  if (project === 'Exit') process.exit()
  const { env } = await askEnvironment();
  if (env === 'Exit') process.exit();

  buildProject(project, env);  
};

module.exports = { run }
