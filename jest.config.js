module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    // Ensure the setup file runs before any modules are imported so
    // environment variables are present for config-time initialization.
    setupFiles: ["<rootDir>/test/jest.setup.ts"],
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
}