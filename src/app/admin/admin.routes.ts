import { Routes } from '@angular/router';

export const adminRoutes: Routes = [

  {
    path: '',
    redirectTo: 'product-management',
    pathMatch: 'full'
  },
  // {
  //   path: 'users',
  //   loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
  //   title: 'users',
  //   data: {}
  // },
  {
  path: 'product-management',  
  loadComponent: () => import('./product-management/product-management.component').then(m => m.ProductManagementComponent)
   
   },


];



