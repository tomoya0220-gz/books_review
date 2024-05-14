module.exports = {
  transform: {"^.+\\.(js|jsx)$": "babel-jest"},
  moduleNameMapper: {"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"},
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  testMatch: [
    "**/jest/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ]
};