module.exports = {
  name: 'feature-lazy-app-dashboard',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/feature/lazy/app-dashboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
