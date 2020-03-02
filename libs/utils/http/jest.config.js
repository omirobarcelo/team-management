module.exports = {
  name: 'utils-http',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/utils/http',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
