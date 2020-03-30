const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = function(config, context) {
  const baseDirectory = path.resolve(config.output.path);

  const migrationPaths = ['_migrations/*.js', '_seeds/**/*.js'];
  config.entry = {
    ...config.entry,
    ...getMigrationEntries(migrationPaths)
  };

  // addSwagger

  config.plugins = [
    new CleanWebpackPlugin({
      verbose: true
    })
  ];

  // Output
  config.output = {
    path: baseDirectory,
    filename: '[name].js',
    libraryTarget: 'commonjs'
  };

  return config;
};

/**
 * Converts globbed migrations to an entry object
 * @param {string[]} migrations migrations files in glob format
 * @returns entry object; key is relative path without extension, value is absolute path
 */
function getMigrationEntries(migrations) {
  console.group('Migrations');
  console.debug('Convert Migrations:', migrations);

  // Convert js file names to ts
  migrations = migrations.map(migration => `${migration.substring(0, migration.lastIndexOf('.'))}.ts`);

  const additionalEntries = {};

  for (let index = 0; index < migrations.length; index++) {
    // Unglob into relative paths each migration directory
    const relativePaths = glob.sync(migrations[index], {
      absolute: false
    });

    for (let index = 0; index < relativePaths.length; index++) {
      const relativePath = relativePaths[index];
      // Get the absolute path for each migration
      const absolutePath = glob.sync(relativePath, {
        absolute: true
      });
      const key = relativePath
        .split('.')
        .slice(0, -1)
        .join('.');
      additionalEntries[key] = absolutePath;
    }
  }

  console.groupEnd();
  return additionalEntries;
}
