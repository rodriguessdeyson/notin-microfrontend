import { Routes } from '@angular/router';
import { TodoManagementComponent } from './pages/todo-management.component';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: TodoManagementComponent,
  },
];
