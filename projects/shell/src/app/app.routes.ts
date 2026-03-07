import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'minhas-estatisticas',
    loadComponent: () =>
      import('./pages/statistics-page.component').then((m) => m.StatisticsPageComponent),
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
