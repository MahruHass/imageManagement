module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  setupFilesAfterEnv: ["./tests/setup.js"],
  testTimeout: 10000,
};
