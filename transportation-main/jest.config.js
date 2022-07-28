module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['./**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['coverage', 'node_modules', 'jest.config.js', 'prettier.config.js'],
};
