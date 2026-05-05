# notin-microfrontend

A micro-frontend workspace powered by **Angular Native Federation**, demonstrating advanced composition patterns for scalable, federated applications.

## Project Overview

This workspace implements a two-tier federated architecture:

- **Shell** (`port 4200`): Host application that orchestrates navigation, layout, and composition
- **Admin** (`port 4201`): Remote application that exposes features as routes and reusable components

## Architecture

The project demonstrates two key integration patterns:

### 1. Full-Page Remote Route
The Shell loads the complete todo management feature from Admin as routed pages.

### 2. Component Fragment Composition
The Shell embeds an isolated status summary component from Admin within its own local page layout.

This dual-pattern approach showcases how to use the same remote app both as a complete feature and as composable building blocks.

## Tech Stack

- **Angular 21** - Latest version with standalone components and signals
- **Native Federation** - Micro-frontend architecture
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type-safe development

## Project Structure

```
├── projects/
│   ├── shell/              # Host application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.routes.ts
│   │   │   │   └── pages/
│   │   │   │       ├── home/
│   │   │   │       │   ├── home-page.component.ts
│   │   │   │       │   └── home-page.component.html
│   │   │   │       └── statistics/
│   │   │   │           ├── statistics-page.component.ts
│   │   │   │           └── statistics-page.component.html
│   │   │   ├── bootstrap.ts
│   │   │   └── main.ts
│   │   ├── federation.config.js
│   │   └── public/federation.manifest.json
│   │
│   └── admin/              # Remote application
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.routes.ts
│       │   │   ├── todo/
│       │   │   │   ├── todo.routes.ts
│       │   │   │   ├── components/
│       │   │   │   │   ├── todo-management.component.ts
│       │   │   │   │   └── todo-management.component.html
│       │   │   │   ├── models/
│       │   │   │   │   └── todo.models.ts
│       │   │   │   └── stores/
│       │   │   │       └── todo.store.ts
│       │   │   └── status/
│       │   │       ├── status-summary.component.ts
│       │   │       └── status-summary-preview.component.ts
│       │   ├── bootstrap.ts
│       │   └── main.ts
│       └── federation.config.js
├── styles/
│   └── tailwind.css
├── angular.json
├── package.json
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

Start both applications:

```bash
npm run start
```

Or start individually:

```bash
npm run start:shell
npm run start:admin
```

### Access

- Shell (Host): `http://localhost:4200`
- Admin (Remote): `http://localhost:4201`

## Key Features

### Global Task Management
Access the complete todo feature at `/lista-global` on the Shell. This page is entirely delivered by the Admin remote and uses Angular Signals for local state management.

### Hybrid Composition
View the Statistics page at `/minhas-estatisticas` on the Shell. This local page imports the status summary component fragment from the Admin remote and renders it within the Shell's layout.

## Architecture Decisions

### Component Templates
All components use separated template files (`*.component.html`) for better maintainability and IDE support:

- **Shell Components**: `home-page.component.ts` + `home-page.component.html`
- **Admin Components**: `todo-management.component.ts` + `todo-management.component.html`

### State Management
Todo state is managed via Angular Signals in `TodoStore`, providing reactive, fine-grained state updates without external dependencies.

### Shared Dependencies
Both shell and admin share core Angular libraries via Federation to avoid runtime duplication:

- `@angular/core`
- `@angular/common`
- `@angular/router`
- `@angular/forms`
- `rxjs`

## Responsibilities

- **Admin**: Feature domain logic, state management, and component/route exposure
- **Shell**: Global navigation, layout orchestration, and remote composition

## Learn More

See individual project READMEs for detailed information:

- [Admin README](projects/admin/README.md)
- [Shell README](projects/shell/README.md)