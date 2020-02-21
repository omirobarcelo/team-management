module.exports = {
  name: 'feature-shared-exercises',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/feature/shared/exercises',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
