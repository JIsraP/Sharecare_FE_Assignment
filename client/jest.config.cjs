module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // This ensures JSX files are transformed
  },
  moduleFileExtensions: ['js', 'jsx'], // Include JSX in module file extensions
  testPathIgnorePatterns: ['/node_modules/', '/build/'], // Ignore build folder if applicable
  setupFilesAfterEnv: ['./src/tests/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
