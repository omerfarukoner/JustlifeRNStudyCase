module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation/.*|@react-native-community|react-native-.*)/)',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules'],
  // Patterns to exclude from test coverage
  coveragePathIgnorePatterns: [
    // index.ts files usually only re-export
    '.*\\/index\\.ts$',
    // Simple utility functions - won't be tested
    '\\/utils\\/logger\\.ts$',
    '\\/utils\\/retry\\.ts$',
    // Simple components
    '\\/components\\/Screen\\/',
    '\\/components\\/OptimizedImage\\/',
    '\\/components\\/StateViews\\/',
    '\\/components\\/SearchBar\\/',
    '\\/components\\/CardItem\\/',
    '\\/components\\/CardTypes\\/TypeItem\\/',
    '\\/components\\/ConnectivityBanner\\/',
    // ApiClient - low level API calls
    '\\/services\\/apiClient\\.ts$',
    // Context
    '\\/context\\/ConnectivityContext\\.tsx$',
    // Files that don't need to be included in test coverage
    '.*\\.d\\.ts',
    '\\.eslintrc\\.js',
    '\\.prettierrc\\.js',
    'babel\\.config\\.js',
    'jest\\.config\\.js',
    'metro\\.config\\.js',
    // Files in the following directories generally don't need to be tested
    '\\/node_modules\\/',
    '\\/android\\/',
    '\\/ios\\/',
    '\\/assets\\/',
    // Test files
    '\\/__tests__\\/',
    '\\/__mocks__\\/',
  ],
};
