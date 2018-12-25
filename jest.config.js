module.exports = {
  moduleFileExtensions: [ "ts", "js" ],
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
  testMatch: [
    "**/__tests__/**/*.ts"
  ]
}