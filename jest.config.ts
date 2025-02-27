import nextJest from "next/jest";

import { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  transform: {},
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  preset: "ts-jest/presets/js-with-ts",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default createJestConfig(config);
