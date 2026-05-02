import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'lista-global',
    loadChildren: () => loadRemoteModule('admin', './TodoRoutes').then((m) => m.TODO_ROUTES),
  },
  {
    path: 'minhas-estatisticas',
    loadComponent: () =>
      import('./pages/statistics/statistics-page.component').then((m) => m.StatisticsPageComponent),
  },
  {
    path: 'global-todos',
    redirectTo: 'lista-global',
  },
  {
    path: 'my-statistics',
    redirectTo: 'minhas-estatisticas',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
