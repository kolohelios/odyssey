module.exports = {
  preset: 'jest-puppeteer',
  testRegex: '/.*.(test|spec)\\.ts',
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
}
