import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEmployeePage } from './list-employee.page';

const routes: Routes = [
  {
    path: '',
    component: ListEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListEmployeePageRoutingModule {}
