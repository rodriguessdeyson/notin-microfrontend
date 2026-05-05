import { withNativeFederation, share } from '@angular-architects/native-federation/config.js';

export default withNativeFederation({
  name: 'admin',

  exposes: {
    './TodoRoutes': './projects/admin/src/app/todo/todo.routes.ts',
    './StatusSummaryComponent': './projects/admin/src/app/status/components/status-summary/status-summary.component.ts',
  },

  shared: {
    ...share({
      '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      '@angular/platform-browser': {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      },
      rxjs: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      'rxjs/operators': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    }),
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],

  features: {
    ignoreUnusedDeps: true,
  },
});
