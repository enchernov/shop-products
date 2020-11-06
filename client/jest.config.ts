module.exports = {
  collectCoverageFrom: [
    '**/components/**/*.{ts,tsx,js,jsx}',
    '**/pages/**/*.{ts,tsx,js,jsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ['./config/setupTests.ts'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  roots: ['<rootDir>/client/components'],
  testPathIgnorePatterns: [
    '/.next/',
    '/node_modules/',
    '/lib/',
    '/utils/',
    '/coverage/',
    '/.storybook/',
  ],
  testRegex: '(/__test__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|sass)$': '<rootDir>/client/utils/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/utils/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/client/node_modules/'],
}

export {}
