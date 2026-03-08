import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo/todo.routes').then((m) => m.TODO_ROUTES),
  },
  {
    path: 'resumo-status',
    loadComponent: () =>
      import('./status/status-summary-preview.component').then(
        (m) => m.StatusSummaryPreviewComponent,
      ),
  },
  {
    path: 'status-summary',
    redirectTo: 'resumo-status',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
