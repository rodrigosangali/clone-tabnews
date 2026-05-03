const dotenv = require('dotenv');

// Força o carregamento do arquivo de desenvolvimento
dotenv.config({
    path: ".env.development",
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: ".",
});

const jestConfig = createJestConfig({
    moduleDirectories: ["node_modules", "<rootDir>"],
    testTimeout: 60000,
});

module.exports = jestConfig;