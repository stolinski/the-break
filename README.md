# The Break

https://thebreak.app

An app for the bboys and bgirls.

It allows for you to have a move book with classifications/names/values. This way you can organize your moves and combos. There are also several tools built into the site based off of practice games I've picked up. Right now there are 3 tools.

30/30 - This is essentially a stop watch that plays an airhorn every 30 seconds. It's useful for developing endurance. Practice hard for 30 seconds, then rest for 30 seconds.

Battle Mode - This shows all of your moves in their different categories. Swipe a move and select it as 'used'. It's then hidden. If you select all of the moves you did in a given round, the ones remaining are the moves you have left. By the time you get to the finals of a jam, you have a list of the moves you have left.

## About The Codebase

- Svelte 5
- Svelte Kit 2
- Pocketbase hosted on Coolify
- Hosted on Cloudflare Pages

## Development

### Setup
```bash
pnpm install
```

### Testing

The project uses Vitest for unit testing and Playwright for end-to-end testing.

#### Unit Tests
```bash
# Run tests once
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with UI
pnpm run test:ui

# Run tests with coverage
pnpm run test:coverage
```

#### E2E Tests
```bash
# Run e2e tests
pnpm run test:e2e

# Run e2e tests with UI
pnpm run test:e2e:ui
```

### Build & Deploy
```bash
# Build the project
pnpm run build

# Preview the build
pnpm run preview
```

syntax.fm
