# Admin

## Overview

The `admin` is the **remote application** in this federated workspace. It runs standalone as a complete Angular application while simultaneously exposing parts of its domain to the `shell` via Native Federation.

It delivers two types of remote contracts:

1. **Full Feature Route** - Complete task management feature exposed as Angular routes
2. **Component Fragment** - Standalone status summary component for reusable composition

## Architecture

This remote application demonstrates:

- Standalone route-based feature exposure
- Reusable component extraction for partial composition
- Angular Signals for reactive state management
- Decoupled domain logic from integration concerns

## Project Structure

```
src/
├── main.ts                                    # Federation initialization
├── bootstrap.ts                               # Angular bootstrap
├── app/
│   ├── app.routes.ts                          # Local app routing
│   ├── todo/
│   │   ├── todo.routes.ts                     # Exposed todo routes
│   │   ├── components/
│   │   │   ├── todo-management.component.ts   # Main component class
│   │   │   └── todo-management.component.html # Template (separated)
│   │   ├── models/
│   │   │   └── todo.models.ts                 # Domain types
│   │   └── stores/
│   │       └── todo.store.ts                  # Signals-based state store
│   └── status/
│       ├── status-summary.component.ts        # Exposed component
│       └── status-summary-preview.component.ts # Local preview page
federation.config.js                           # Federation exports & shared deps
```

## Component Architecture

### Separated Templates
All components use separate template files for better maintainability:

- **`todo-management.component.ts`** - Component logic and metadata
- **`todo-management.component.html`** - Template markup

This separation enables:
- Better IDE support and template validation
- Easier refactoring and testing
- Cleaner component class logic

### State Management

The `TodoStore` uses Angular Signals for fine-grained reactivity:

```typescript
readonly todos = signal<TodoItem[]>([])
readonly summary = computed(() => ({ /* derived state */ }))
```

This provides:
- Automatic change detection with `OnPush` strategy
- No external state management library
- Predictable, testable state mutations

## Routes

When running standalone on `http://localhost:4201`:

- `/` - Main task management dashboard
- `/resumo-status` - Local preview of the status summary component

The app is fully functional in isolation—no dependency on the Shell.

## Exposed Contracts

In `federation.config.js`, the Admin publishes:

### `./TodoRoutes`
- **Points to**: `src/app/todo/todo.routes.ts`
- **Type**: Array of Angular routes
- **Consumer**: Shell's `/lista-global` route
- **Use case**: Full-page remote feature delivery

### `./StatusSummaryComponent`
- **Points to**: `src/app/status/status-summary.component.ts`
- **Type**: Standalone Angular component
- **Consumer**: Shell's statistics page
- **Use case**: Embedded component fragment

## Shared Dependencies

Core Angular and utility libraries are shared via Federation to prevent runtime duplication:

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

## Running

### Standalone
```bash
npm run start:admin
```

### With Shell
```bash
npm run start:admin
npm run start:shell
```

**Access**: `http://localhost:4201`

## Integration with Shell

The Shell consumes the Admin remote without knowing its internal implementation. It only depends on the exposed contracts:

1. Routes are loaded dynamically at `/lista-global`
2. Components are loaded on-demand in pages like `/minhas-estatisticas`

This maintains clear separation of concerns:

- **Admin**: Feature domain, state, and logic
- **Shell**: Navigation orchestration and layout composition

## Maintenance Guidelines

The Admin is the single source of truth for the task management feature.

Changes affecting:

- Task domain models
- State management and signals
- Form logic and validation
- Status summary display
- Route structure

...should be made in this project.

## Development Tips

- Use the local preview routes (`/resumo-status`) to develop and test components in isolation
- Changes to exposed contracts must be reflected in `federation.config.js`
- Keep component templates in separate `.html` files for consistency
- Use Angular DevTools to debug signal reactivity
