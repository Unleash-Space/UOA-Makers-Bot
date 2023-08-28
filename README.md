# UOA-Makers-Bot

Bot for the UOA Makers Discord server.

## Setup

Make sure you have installed [NVM](https://github.com/nvm-sh/nvm) to manage your Node versions (and Node 20) and [pnpm](https://pnpm.js.org/en/installation) to manage our dependencies.

```bash
pnpm install # Install dependencies
```

Copy the `.template.env` file to `.env` and fill in the values.

## Running

```bash
pnpm dev # Run the development server
pnpm build # Build the server for production
pnpm start # Run the production server
```

## Deployment

```bash
pnpm run deploy-commands # Deploy the commands to Discord
```

## Commit Messages

We use conventional commit messages. Youe message should be in the format of `<type>: <subject>`. For example, `feat: add new command`. The types are as follows:

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `chore`: Changes that don't modify src or test files
- `ci`: Changes to our CI configuration files and scripts
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `revert`: Reverts a previous commit
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests
