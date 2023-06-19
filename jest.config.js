/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const jestConfig = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,cjs}',
    '!**/node_modules/**',
    '!**/graphql/**',
    '!**/constants/**'
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'babel',
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  // Use this configuration option to add custom reporters to Jest.
  reporters: [
    'default',
    [
      'jest-junit',
      { classNameTemplate: '{classname}', titleTemplate: '{title}', ancestorSeparator: ' > ' }
    ]
  ],
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'cjs'],
  // The root directory that Jest should scan for tests and modules within
  rootDir: './',
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src/'],
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  transform: {
    '\\.[jt]s$': 'babel-jest'
  }
};

export default jestConfig