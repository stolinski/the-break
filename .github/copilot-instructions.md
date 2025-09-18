# The Break - Breakdancing Move Management App

The Break is a Svelte 5 + SvelteKit 2 web application for breakdancers to organize moves, practice with timing tools, and manage battle sets. It uses PocketBase for backend services and is hosted on Cloudflare Pages.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Installation

- Install Node.js 17.0.1 exactly (required by .node-version): `wget https://nodejs.org/dist/v17.0.1/node-v17.0.1-linux-x64.tar.xz && tar -xJf node-v17.0.1-linux-x64.tar.xz && export PATH=$PWD/node-v17.0.1-linux-x64/bin:$PATH`
- Install pnpm globally: `npm install -g pnpm`
- Install dependencies: `pnpm install` -- takes 2-17 seconds on first run, ~2 seconds on subsequent runs. NEVER CANCEL.

### Core Development Commands

- Check types: `pnpm run check` -- takes ~5 seconds. EXPECT TypeScript errors (25 errors, 4 warnings). The project builds successfully despite these errors.
- Format code: `pnpm run format` -- takes ~1 second. ALWAYS run this before linting or committing.
- Lint code: `pnpm run lint` -- **WARNING**: ESLint currently fails with "eslint: not found". The Prettier check portion works. Focus on formatting only.
- Build: `pnpm run build` -- takes ~7 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Dev server: `pnpm run dev` -- starts in ~2 seconds on http://localhost:5173
- Preview build: `pnpm dlx vite preview --outDir .svelte-kit/output/client` -- serves production build on http://localhost:4173

### CRITICAL Build and Timing Information

- **NEVER CANCEL** any build or install command
- `pnpm install`: 2-17 seconds (first time), 2 seconds (subsequent)
- `pnpm run build`: ~7 seconds - NEVER CANCEL, set timeout to 30+ seconds minimum
- `pnpm run format`: ~1 second
- `pnpm run check`: ~5 seconds (will show TypeScript errors - this is expected)
- All commands complete quickly. If any command hangs for more than 30 seconds, investigate.

## Validation Requirements

### Manual Testing Scenarios

After making any changes, ALWAYS test these core user flows:

1. **Application Startup**:

   - Run `pnpm run dev`
   - Visit http://localhost:5173
   - Verify login page loads correctly with dark theme
   - Take screenshot to confirm UI rendering

2. **Navigation Flow**:

   - Navigate to signup page (/auth/signup)
   - Verify form renders correctly with email/password fields
   - Test form interaction (typing in fields works)
   - Note: External API calls to api.thebreak.app will fail in sandboxed environments (expected)

3. **Build Validation**:

   - Run `pnpm run build` and verify it completes successfully
   - Run preview server and test that static build works

4. **Core Application Pages** (requires authentication in real environment):
   - /moves - Move management interface
   - /tools - Practice tools overview
   - /tools/30s - 30-second timer tool
   - /tools/battle-mode - Battle move tracking
   - /tools/set-builder - Set creation tool
   - /time - Timer interface
   - /profile - User profile

### Pre-commit Validation

ALWAYS run these commands before committing changes:

```bash
pnpm run format    # Fix code formatting
pnpm run build     # Ensure build succeeds
```

Note: Skip `pnpm run lint` due to ESLint configuration issue. The build command will catch most syntax errors.

## Known Issues and Workarounds

### Expected Errors

- **TypeScript Errors**: The project has 25 TypeScript errors and 4 warnings. These are existing issues and do not prevent building or running the application.
- **ESLint Configuration Issue**: The `pnpm run lint` command fails with "eslint: not found". The Prettier portion works correctly for code formatting.
- **API Connection Failures**: In sandboxed environments, calls to `https://api.thebreak.app` will fail. This is expected and does not indicate a problem with your changes.
- **Svelte Version Warning**: The project uses Svelte 5.0.0-next.175 with vite-plugin-svelte@3. The warning about upgrading to vite-plugin-svelte@4 can be ignored.
- **Preview Command**: The `pnpm run preview` script is broken. Use `pnpm dlx vite preview --outDir .svelte-kit/output/client` instead.

### Build System Notes

- Uses pnpm (not npm) as package manager
- Requires Node.js 17.0.1 exactly (check .node-version)
- Build warnings about deprecated `on:click` usage are expected
- Prettier warns about `--plugin-search-dir` flag being ignored (harmless)

## Application Architecture

### Key Technologies

- **Frontend**: Svelte 5 + SvelteKit 2
- **Build Tool**: Vite 5.4.4
- **Backend**: PocketBase (https://api.thebreak.app)
- **Deployment**: Cloudflare Pages (using @sveltejs/adapter-cloudflare)
- **Styling**: Custom CSS with CSS variables
- **State Management**: Svelte 5 runes and stores

### Important Files and Directories

```
src/
├── routes/
│   ├── (app)/          # Authenticated app routes
│   │   ├── moves/      # Move management
│   │   ├── tools/      # Practice tools
│   │   ├── time/       # Timer functionality
│   │   └── profile/    # User profile
│   └── (site)/         # Public routes (auth)
├── lib/
│   ├── auth/           # Authentication components
│   ├── state/          # Svelte stores and state
│   └── *.svelte        # Reusable components
├── pocketbase.ts       # PocketBase configuration
├── pocket-types.ts     # Generated TypeScript types
└── settings.ts         # App configuration
```

### State Management

- `src/lib/state/moves.svelte.ts` - Move data management
- `src/lib/state/battle_moves.svelte.ts` - Battle mode state
- `src/lib/state/page.ts` - Page title management
- `src/lib/state/session.ts` - User session state

### External Dependencies

- **UI Libraries**: @neodrag/svelte, @rodrigodagostino/svelte-sortable-list
- **Data**: dexie (IndexedDB), pocketbase (backend client)
- **Utilities**: just-kebab-case, sk-form-data

## Common Development Tasks

### Adding New Features

- Create new routes in `src/routes/(app)/` for authenticated features
- Add reusable components to `src/lib/`
- Update types in `src/pocket-types.ts` if adding new data models
- Always test with `pnpm run dev` and take screenshots of UI changes

### Debugging

- Check browser console for client-side errors
- Server logs appear in the terminal running `pnpm run dev`
- TypeScript errors can be checked with `pnpm run check`
- Use browser dev tools for styling and responsive issues

### Code Style

- Use Prettier for formatting: `pnpm run format`
- Follow existing patterns for Svelte 5 runes (`$state`, `$derived`, `$effect`)
- Prefer `onclick` over deprecated `on:click` in new code
- Use TypeScript for type safety where possible

## Quick Reference Commands

```bash
# Fresh setup
pnpm install

# Development
pnpm run dev                    # Start dev server
pnpm run format                 # Format code (always run first)
pnpm run check                  # Type check (expect errors)
# Note: Skip `pnpm run lint` due to ESLint issue

# Build and deploy
pnpm run build                  # Build for production (~7 sec)
pnpm dlx vite preview --outDir .svelte-kit/output/client  # Preview build

# Utilities
pnpm run typegen               # Regenerate PocketBase types
```

Remember: This project builds and runs successfully despite TypeScript errors. Focus on functionality and user experience rather than fixing existing type issues unless they directly impact your changes.
