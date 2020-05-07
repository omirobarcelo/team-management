const prompt = require('prompt');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.error(`${chalk.yellow('Entering migration creation process - Specify migration type and name')}`);

const prompt_attributes = [
  {
    name: 'MigrationDirectory',
    default: '_migrations',
    required: true
  },
  {
    name: 'MigrationType',
    description: 'Type - [1]: Create Empty [2]: Generate from database',
    pattern: /^[12]{1}$/,
    message: 'Migration type is not one of the valid values (1 or 2)',
    default: '1'
  },
  {
    name: 'MigrationName',
    pattern: /^[a-zA-Z-_]+$/,
    message: 'File name is not valid; only letters, dashes, and underscores are allowed',
    required: true
  }
];

// Start the prompt to read user input
prompt.start();

// Prompt and get user input, then display the data to the console
prompt.get(prompt_attributes, function(err, result) {
  if (err) {
    console.error(`${chalk.red(err)}`);
    return 1;
  } else {
    const nodeEnv = `dev`;
    const migrationType = result.MigrationType === '1' ? 'create' : 'generate';
    const migrationName = result.MigrationName;
    const migrationDirectory = result.MigrationDirectory;

    console.log(`Loading Environment Data...`);
    const env = require('dotenv').config({ path: path.join(__dirname, `../.env.${nodeEnv}`) }).parsed;
    if (!env) {
      console.error(
        `${chalk.red(`The file .env.${nodeEnv} could not be loaded. Make sure it exists at the application's root`)}`
      );
      return 1;
    }

    const jsonConfig = {
      type: 'sqlite',
      entities: ['./libs/feature/api/**/entities/*.entity.ts'],
      database: path.join(env.APP_ROOT_PATH, env.TYPEORM_DATABASE)
    };
    const jsonConfigData = JSON.stringify(jsonConfig);
    process.stdout.write(`${chalk.yellow('Writing config file...')}`);
    fs.writeFileSync(path.join(__dirname, `../temp/ormconfig.json`), jsonConfigData);
    process.stdout.write(`${chalk.green('✔\n')}`);

    console.log(`${chalk.yellow('Creating migration...')}`);
    let executionString =
      'ts-node -r tsconfig-paths/register  --project tsconfig-db.json ./node_modules/typeorm/cli.js migration:';
    executionString = executionString.concat(migrationType);
    executionString = executionString.concat(` -f temp/ormconfig.json`);
    executionString = executionString.concat(` -d ${migrationDirectory}`);
    executionString = executionString.concat(` -n ${migrationName}`);

    process.stdout.write(`${chalk.yellowBright('Execution command: ')}`);
    process.stdout.write(`> ${chalk.yellow(executionString)}\n`);

    const output = execSync(executionString);
    console.log(`${chalk.blue(output)}`);

    console.log(`${chalk.yellow('Cleanup')}`);
    fs.unlinkSync(path.join(__dirname, `../temp/ormconfig.json`));
  }
});
