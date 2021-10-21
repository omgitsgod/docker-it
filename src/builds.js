const fs = require('fs');

const buildReactDockerDev = (package) => {
  
  const dockerfileDevPath = './Dockerfile.dev';
  const dockerComposeDevPath = './docker-compose.dev.yml';
  const dockerignorePath = './.dockerignore';
  const nginxDirPath = './nginx';
  const nginxDevConfPath = './nginx/nginx.dev.conf';
  const packagePath = './package.json';
  const yarn = package === 'yarn'

  const dockerFileDevContent =
    `FROM node:16-slim\n\nWORKDIR /app\n\nCOPY package.json ./\n\nCOPY ${yarn ? 'yarn.lock' : 'package-lock.json'} ./\n\nRUN ${yarn ? 'yarn' : 'npm'} install --network-timeout 1000000\n\nCOPY . .\n`;
  const dockerComposeDevContent =
    `version: "3"\n\nservices:\n\n  nginx:\n    container_name: core_web\n    restart: on-failure\n    image: nginx:stable\n    volumes:\n      - ./nginx/nginx.dev.conf:/etc/nginx/conf.d/default.conf\n    ports:\n      - "80:80"\n    depends_on:\n      - web\n  web:\n    container_name: react_app\n    restart: on-failure\n    build:\n      context: .\n      dockerfile: Dockerfile.dev\n    volumes:\n      - ./src:/app/src\n    ports:\n      - "3000:3000"\n    command: >\n      ${yarn ? 'sh -c "yarn start"' : 'sh -c "npm start"'}\n    environment:\n      - CI=true\n`;
  const dockerignoreContent =
    'node_modules\nnpm-debug.log\nDockerfile.dev\nDockerfile.prod\n.dockerignore\nyarn-error.log\n';
  const nginxDevConfContent =
    'upstream webapp {\n\tserver react_app:3000;\n}\nserver {\n\tlisten 80;\n\tserver_name localhost;\n\n\tlocation / {\n\t\tproxy_pass http://webapp;\n\t\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\t\tproxy_set_header Host $host;\n\t\tproxy_redirect off;\n\t}\n}\n';

  fs.writeFile(dockerfileDevPath, dockerFileDevContent, (err) =>
    console.log(err)
  );
  fs.writeFile(dockerComposeDevPath, dockerComposeDevContent, (err) =>
    console.log(err)
  );
  fs.writeFile(dockerignorePath, dockerignoreContent, (err) =>
    console.log(err)
  );
  fs.mkdir(nginxDirPath, { recursive: true }, (err) => {
    if (!err)
      fs.writeFile(nginxDevConfPath, nginxDevConfContent, (err) =>
        console.log(err)
      );
  });
  fs.writeFile(nginxDevConfPath, nginxDevConfContent, (err) =>
    console.log(err)
  );

  fs.readFile(packagePath, (err, data) => {
    const json = JSON.parse(data);
    const scripts = json.scripts;
    const addToScripts = {
      'docker-dev': 'docker-compose -f docker-compose.dev.yml up -d --build',
      'docker-dev-stop': 'docker-compose -f docker-compose.dev.yml down',
    };
    const newScripts = {
      ...scripts,
      ...addToScripts,
    };
    json.scripts = newScripts;

    fs.writeFile(packagePath, JSON.stringify(json, null, '\t'), (err) =>
      console.log(err)
    );
  });
};

const buildProject = (package, project, environment) => {
  switch (`${project}-${environment}`) {
    case 'React-Dev':
      return buildReactDockerDev(package);
    default:
      console.log('build')
  }
}

module.exports = { buildProject };
