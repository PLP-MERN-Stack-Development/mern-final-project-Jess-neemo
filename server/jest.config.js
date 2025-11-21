// server/jest.config.js
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  transform: {}, // skip Babel since we're using native ESM
};

export default config;