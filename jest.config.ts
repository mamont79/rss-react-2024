export {};
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!**/vendor/**',
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/test/__ mocks __/styleMock.js',
  },

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'jest.setup.ts',
    'src/main.tsx',
    'src/App.tsx',
    'index.tsx',
    'src/test',
    'src/customHooks',
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
