import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { EmploymentInfoService } from '../services/employment-info.service';
import { PersonalInfoService } from '../services/personal-info.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.page.html',
  styleUrls: ['./list-employee.page.scss'],
})
export class ListEmployeePage implements OnInit {
  public infoEmployee: any;
  employees: Array<any> = [];
  employmentsInfo: any = [];
  personalInfo: any = [];

  constructor(
    private employeeService: EmployeeService,
    private employmentInfoService: EmploymentInfoService,
    private personalInfoService: PersonalInfoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllEmployees();
    this.getAllEmploymentsInfo();
    this.getAllPersonalInfo();
  }

  ionViewWillEnter() {
    this.getAllEmployees();
    this.getAllEmploymentsInfo();
    this.getAllPersonalInfo();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((employees: any) => {
      this.employees = employees;
    });
  }

  getAllEmploymentsInfo() {
    this.employmentInfoService
      .getAllEmploymentInfo()
      .subscribe((employmentsInfo) => {
        this.employmentsInfo = employmentsInfo;
      });
  }

  getAllPersonalInfo() {
    this.personalInfoService.getAllPersonalInfo().subscribe((personalInf) => {
      this.personalInfo = personalInf;
    });
  }

  addEmployee() {
    this.router.navigateByUrl('/add-employee');
  }

  removeEmployee(employeeName: string) {
    let id;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name == employeeName) {
        id = this.employees[i].employee_id;
      }
    }

    this.employeeService.removeEmployee(id).subscribe((employee) => {
      this.getAllEmployees();
    });
  }
  async modifyEmployee(employeeId: any) {
    for (let i = 0; i < this.employees.length; i++) {
      if (employeeId == this.employees[i].employee_id) {
        if (employeeId == this.employmentsInfo[i].employee_id) {
          if (employeeId == this.personalInfo[i].employee_id) {
            localStorage.setItem(
              'modifyEmployee',
              JSON.stringify({
                employee_id: this.employees[i].employee_id,
                name: this.employees[i].name,
                last_names: this.employees[i].last_names,
                email: this.employees[i].email,
                direction: this.personalInfo[i].direction,
                phone: this.personalInfo[i].phone,
                salary: this.employmentsInfo[i].salary,
                booth: this.employmentsInfo[i].booth,
                photo: `http://localhost:8080/images/${this.employees[i].employee_img}`,
                comprueba: 'Yes',
              })
            );
          }
        }
      }
    }

    this.router.navigateByUrl('modify-employee');
  }
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
