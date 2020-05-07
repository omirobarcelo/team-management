module.exports = {
  name: 'feature-shared-app-services',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/feature/shared/app-services',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
