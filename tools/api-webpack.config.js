const CircularDependencyPlugin = require('circular-dependency-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const path = require('path');
const ts = require('typescript');
const webpack = require('webpack');

let numCyclesDetected = 0;

module.exports = function(config, context) {
  const baseDirectory = path.resolve(config.output.path);

  const migrationPaths = ['_migrations/*.js', '_seeds/**/*.js'];
  config.entry = {
    ...config.entry,
    ...getMigrationEntries(migrationPaths)
  };

  addSwagger(config);

  config.plugins = [
    new webpack.ProvidePlugin({
      openapi: '@nestjs/swagger'
    }),
    new CleanWebpackPlugin({
      verbose: true
    }),
    new CircularDependencyPlugin({
      onStart({ compilation }) {
        console.log('Start detecting webpack modules cycles');
        numCyclesDetected = 0;
      },
      // `onDetected` is called for each module that is cyclical
      onDetected({ module: webpackModuleRecord, paths, compilation }) {
        numCyclesDetected++;
        // `paths` will be an Array of the relative module paths that make up the cycle
        // `module` will be the module record generated by webpack that caused the cycle
        compilation.warnings.push(new Error(paths.join(' -> ')));
      },
      // `onEnd` is called before the cycle detection ends
      onEnd({ compilation }) {
        console.log('End detecting webpack modules cycles');
        console.log(`Detected ${numCyclesDetected}`);
      },
      // exclude detection of files:
      // Ignore node_modules content. dtos and entities.
      exclude: /a\.js|node_modules|.entity.ts|.dto.ts/,
      // include specific files based on a RegExp
      include: /src/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
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
 * Adds nestjs swagger plugin
 * https://github.com/nrwl/nx/issues/2147
 * nestjs swagger: https://docs.nestjs.com/recipes/swagger#plugin
 * ts-loader: https://github.com/Igorbek/typescript-plugin-styled-components#ts-loader
 * getCustomTransformers: https://github.com/TypeStrong/ts-loader#getcustomtransformers
 */
function addSwagger(config) {
  const rule = config.module.rules.find(rule => rule.loader === 'ts-loader');
  if (!rule) throw new Error('no ts-loader rule found');
  rule.options = {
    ...rule.options,
    getCustomTransformers: () => {
      const program = ts.createProgram([path.join(__dirname, 'main.ts')], {});
      return {
        before: [
          require('@nestjs/swagger/plugin').before(
            {
              classValidatorShim: true
            },
            program
          )
        ]
      };
    }
  };
}

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
