import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-employee',
    pathMatch: 'full',
  },
  {
    path: 'list-employee',
    loadChildren: () =>
      import('./list-employee/list-employee.module').then(
        (m) => m.ListEmployeePageModule
      ),
  },
  {
    path: 'add-employee',
    loadChildren: () =>
      import('./add-employee/add-employee.module').then(
        (m) => m.AddEmployeePageModule
      ),
  },
  {
    path: 'modify-employee',
    loadChildren: () =>
      import('./modify-employee/modify-employee.module').then(
        (m) => m.ModifyEmployeePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
