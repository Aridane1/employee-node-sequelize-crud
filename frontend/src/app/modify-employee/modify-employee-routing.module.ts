import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyEmployeePage } from './modify-employee.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyEmployeePageRoutingModule {}
