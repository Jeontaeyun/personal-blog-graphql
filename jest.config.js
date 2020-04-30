module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    verbose: true,
    displayName: {
        name: "STARK",
        color: "blue"
    },
    notify: true,
    notifyMode: "always",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", , "js", "jsx", "json"],
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["./src/test/config/setupTest.ts"]
};
