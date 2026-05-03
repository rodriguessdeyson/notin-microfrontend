import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'global-tasks',
    loadChildren: () => loadRemoteModule('admin', './TodoRoutes').then((m) => m.TODO_ROUTES),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics-page.component').then((m) => m.StatisticsPageComponent),
  },
  {
    path: 'global-todos',
    redirectTo: 'global-tasks',
  },
  {
    path: 'my-statistics',
    redirectTo: 'statistics',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
