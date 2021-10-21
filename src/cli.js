const chalk = require('chalk');
const figlet = require('figlet');
const hasbin = require('hasbin');
const { askPackage, askProject, askEnvironment } = require('./inquirer');
const { buildProject } = require('./builds')

const run = async () => {

  const dockerIsInstalled = hasbin.sync('docker')
  const dockerComposeIsInstalled = hasbin.sync('docker-compose')
  const yarnIsInstalled = hasbin.sync('yarn')
  
  console.log(
    chalk.yellow(figlet.textSync('docker-it', { horizontalLayout: 'full' }))
  );
  console.log(`docker: ${dockerIsInstalled ? chalk.green('installed') : chalk.red('not installed')}`)
  console.log(`docker-compose: ${dockerComposeIsInstalled ? chalk.green('installed') : chalk.red('not installed')}`);
  
  const package = yarnIsInstalled ? await askPackage() : 'npm';
  const project = await askProject();
  const env = await askEnvironment();

  buildProject(package, project, env);  
};

module.exports = { run };
