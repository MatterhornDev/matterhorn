# Matterhorn

An API Boilerplate project built with Node.js and Typescript.

- ⏱ Runtime: [Node.js](https://nodejs.org/en/)
- 🖥 API: [Fastify](https://www.fastify.io/)
- 🔏 Type System: [TypeScript](https://www.typescriptlang.org/)
- 🧪 Testing: [Jest](https://jestjs.io/)
- 👕 Linting: [TSLint](https://palantir.github.io/tslint/)

## Scripts

The following npm scripts can be run using `npm run <script>`. This project relies on `opn` and `rimraf` utilities in order to support cross-platform opening and deleting files.

- `build`: Build the app using the TypeScript build [config file](tsconfig.json)
- `build:watch`: Run the `build` command while watching for changes in the `/src` directory
- `clean`: Recursively delete the `lib/` and `coverage/` directories
- `clean:build`: Recursively delete the `lib/` directory
- `clean:coverage`: Recursively delete the `coverage/` directory
- `coverage`: Run the test suite and generate coverage reports in the following formats: `[json, text, lcov, html]`. If you want to only generate a single type of coverage report use `npm run test -- --coverageReporters=<report type>`
- `coverage:open`: Run `npm run coverage` and then automatically open the coverage html output in your default browser
- `dev`: Concurrently runs `build:watch` and `start:watch` commands.
- `lint`: Run the linter on the `src/` directory and output the result to the console
- `start`: Run the application. You must run `npm run build` before using this command
- `start:watch`: Run the application while watching for changes in the `lib/` directory. Uses `nodemon`. This command also supplies the `--log` command line arg to the application. Learn more about how this app supports command line arguments [here](#command-line-arguments).
- `test`: Run all unit tests using the Jest configuration [file](jest.config.js)

## Command Line Arguments & Environment Variables

This project implements an example of how to use both command line arguments and environment variables. It uses `yargs-parser` to manage command line arguments. Command line arguments are passed in through the start command: `node lib/index.js <command line arguments>`. The `--log` argument has been enabled as an example. Running `npm run start` starts up the project without any command line arguments. This command is intended to be used in production, so logging is disabled by default (i.e. we don't pass the `--log` argument). If you are using this command to test your code locally and want to see the logging output, then run `npm run start -- --log`. This passes the command line arg through npm and into the aliased command (`node lib/index.js`). 

Environment variables work in a similar way to command line arguments. They can be set in multiple ways depending on the terminal and operating sytem you are using. In a `bash` terminal you can specify environment variables as you use any of the above mentioned scripts by prepending the assignment to the command. For example, this project has the `PORT` environment variable enabled. In a `bash` temrinal run `PORT=8080 npm run start` to run the API on port 8080.

## Contributing

Open an **issue** if you'd like to report a bug or a feature. Make sure to write a detailed description and indicate if you will or will not be resolving the issue yourself.

If you are interested in contributing make sure to follow these practices:
- Prepend branches with `fix/`, `feature/`, or `docs/` depending on the change being made
- NPM commands `test`, `lint`, and `build` run without failing. 
- If you are solving an open issue, reference it in the Pull Request description using `Ref #<issue number>`.

### Contributors
🦉 Ethan Arrowood _Original Author_ - Follow on: Twitter [@ArrowoodTech](https://twitter.com/arrowoodtech) & GitHub [@Ethan-Arrowood](https://github.com/Ethan-Arrowood/)
