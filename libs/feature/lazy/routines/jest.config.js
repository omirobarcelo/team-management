module.exports = {
  name: 'feature-lazy-routines',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/feature/lazy/routines',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
