import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyEmployeePageRoutingModule } from './modify-employee-routing.module';

import { ModifyEmployeePage } from './modify-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifyEmployeePageRoutingModule,
  ],
  declarations: [ModifyEmployeePage],
})
export class ModifyEmployeePageModule {}
