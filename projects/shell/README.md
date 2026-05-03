# Shell

## Overview

The `shell` is the **host application** in this federated workspace. It orchestrates the primary navigation, bootstraps Native Federation using a local manifest, and composes its own pages with resources dynamically loaded from the `admin` remote.

The Shell handles three key responsibilities:

1. **Primary Experience** - Defines the main application shell and layout
2. **Remote Page Loading** - Loads the complete task management feature from Admin
3. **Hybrid Composition** - Embeds remote fragments within local pages

## Architecture

This host application demonstrates:

- Federation manifest-based remote discovery
- Lazy-loaded remote routes integration
- Dynamic component loading and composition
- Separation of host layout from feature concerns

## Project Structure

```
src/
├── main.ts                                      # Federation initialization
├── bootstrap.ts                                 # Angular bootstrap
├── app/
│   ├── app.routes.ts                            # Local & remote routing
│   ├── app.ts                                   # Root component
│   └── pages/
│       ├── home/
│       │   ├── home-page.component.ts           # Home page class
│       │   └── home-page.component.html         # Template (separated)
│       └── statistics/
│           ├── statistics-page.component.ts     # Statistics page class
│           └── statistics-page.component.html   # Template (separated)
public/
├── federation.manifest.json                     # Remote registry
└── index.html
federation.config.js                             # Federation config & shared deps
```

## Component Architecture

### Separated Templates
All components use separate template files for consistency and maintainability:

- **`home-page.component.ts`** - Component logic and metadata
- **`home-page.component.html`** - Landing page template

- **`statistics-page.component.ts`** - Statistics logic with remote loading
- **`statistics-page.component.html`** - Stats page template with dynamic component outlet

This separation enables:
- Consistent code organization across both Shell and Admin
- Enhanced IDE template support
- Easier testing and refactoring

## Routes

### Local Pages
- `/` - Landing page introducing the application
- `/minhas-estatisticas` - Statistics page with embedded remote component

### Remote Pages
- `/lista-global` - Complete task management feature from Admin
  - Dynamically loads `./TodoRoutes` from Admin
  - Integrates remote routes into the host navigation

## Remote Integration Patterns

### Pattern 1: Full-Page Route Delegation

**Location**: `src/app/app.routes.ts`

```typescript
{
  path: 'lista-global',
  loadChildren: () => loadRemoteModule('admin', './TodoRoutes')
}
```

- **What**: Loads complete route array from remote
- **How**: Uses `loadRemoteModule` with route contract name
- **Effect**: Admin's entire todo feature becomes `/lista-global/*`
- **Use Case**: Full-featured module delivery

### Pattern 2: Component Fragment Embedding

**Location**: `src/app/pages/statistics/statistics-page.component.ts`

```typescript
private async loadFragment(): Promise<void> {
  const remoteModule = await loadRemoteModule('admin', './StatusSummaryComponent')
  this.fragmentComponent.set(remoteModule.StatusSummaryComponent)
}
```

- **What**: Loads standalone component and embeds it
- **How**: Uses `loadRemoteModule` with component contract name
- **Rendered**: Via `*ngComponentOutlet` in the template
- **Use Case**: Partial component composition

## Remote Discovery

**File**: `public/federation.manifest.json`

Defines where to find remote applications:

```json
{
  "admin": "http://localhost:4201/remoteEntry.json"
}
```

This manifest is loaded in `src/main.ts` before Angular bootstraps, enabling dynamic remote resolution at runtime.

## Shared Dependencies

Core libraries are shared via Federation to prevent runtime duplication:

```javascript
// federation.config.js
shared: [
  '@angular/core',
  '@angular/common',
  '@angular/router',
  '@angular/forms',
  '@angular/platform-browser',
  'rxjs',
  'rxjs/operators'
]
```

Both Shell and Admin use the same library instances, reducing bundle size and improving performance.

## Running

### With Admin (Recommended)
```bash
npm run start:admin
npm run start:shell
```

**Access**:
- Shell: `http://localhost:4200`
- Admin: `http://localhost:4201`

### Standalone Shell (Limited)
```bash
npm run start:shell
```

Note: Remote features will fail to load without Admin running.

## Error Handling

The Shell gracefully handles remote loading failures:

- Loading state shown during fetch
- Error message displayed if Admin is unavailable
- User guidance to start the Admin application

See `src/app/pages/statistics/statistics-page.component.ts` for the error handling pattern.

## Architecture Guidelines

The Shell is the **central composition point** of the application. It should:

- ✅ Define global navigation and layout
- ✅ Orchestrate remote composition
- ✅ Handle cross-cutting concerns (auth, error handling)
- ❌ NOT contain feature business logic
- ❌ NOT duplicate remote domain code

All task management logic remains in the Admin.

## Development Tips

- Use browser DevTools to inspect the Federation Network tab
- Check `public/federation.manifest.json` to verify remote mapping
- Monitor the console for remote loading errors
- Test route navigation with the Shell running standalone first (to catch route issues)
- Use the Angular DevTools to inspect change detection for components with signals
