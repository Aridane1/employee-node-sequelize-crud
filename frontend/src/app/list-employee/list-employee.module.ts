import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListEmployeePageRoutingModule } from './list-employee-routing.module';

import { ListEmployeePage } from './list-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListEmployeePageRoutingModule
  ],
  declarations: [ListEmployeePage]
})
export class ListEmployeePageModule {}
