module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/"],
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
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
    moduleFileExtensions: ["ts", , "js", "jsx", "json"],
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"]
};
