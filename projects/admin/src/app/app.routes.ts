import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo/todo.routes').then((m) => m.TODO_ROUTES),
  },
  {
    path: 'status-preview',
    loadComponent: () =>
      import('./status/components/status-summary/status-summary-preview.component').then(
        (m) => m.StatusSummaryPreviewComponent,
      ),
  },
  {
    path: 'status-summary',
    redirectTo: 'status-preview',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
