import { Routes } from '@angular/router';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    // children:[...adminRoutes]
  }
];

