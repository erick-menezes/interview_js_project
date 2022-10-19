/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  setupFilesAfterEnv: ['regenerator-runtime/runtime'],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
};
