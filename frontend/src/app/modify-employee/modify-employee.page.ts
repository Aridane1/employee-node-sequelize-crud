import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { EmployeeService } from '../services/employee.service';
import { EmploymentInfoService } from '../services/employment-info.service';
import { PersonalInfoService } from '../services/personal-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-employee',
  templateUrl: './modify-employee.page.html',
  styleUrls: ['./modify-employee.page.scss'],
})
export class ModifyEmployeePage implements OnInit {
  employeeForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: any;
  employee: any;
  employmentInfo: any;
  personalInfo: any;
  comprobacion: any;
  constructor(
    private photoService: PhotoService,
    private employeeService: EmployeeService,
    private employmentInfoService: EmploymentInfoService,
    private personalInfoService: PersonalInfoService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      booth: ['', [Validators.required]],
      tlf: ['', [Validators.required]],
      email: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.employeeForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = '';
    this.putInfoInForm();
  }

  get errorControl() {
    return this.employeeForm.controls;
  }

  putInfoInForm() {
    this.employee = localStorage.getItem('modifyEmployee');
    this.employee = JSON.parse(this.employee);
    this.capturedPhoto = this.employee.photo;
    this.comprobacion = this.employee.comprueba;
    console.log(this.capturedPhoto);
    if (this.capturedPhoto == 'http://localhost:8080/images/') {
      this.capturedPhoto =
        'http://localhost:8080/images/default/default-user.svg';
    }

    this.employeeForm.controls['name'].setValue(this.employee.name);
    this.employeeForm.controls['last_name'].setValue(this.employee.last_names);
    this.employeeForm.controls['direction'].setValue(this.employee.direction);
    this.employeeForm.controls['email'].setValue(this.employee.email);
    this.employeeForm.controls['salary'].setValue(this.employee.salary);
    this.employeeForm.controls['tlf'].setValue(this.employee.phone);
    this.employeeForm.controls['booth'].setValue(this.employee.booth);
  }
  takePhoto() {
    this.photoService.takePhoto().then((data) => {
      this.capturedPhoto = data.webPath;
    });
    this.comprobacion = 'No';
  }

  pickImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
    });
    this.comprobacion = 'No';
  }

  discardImage() {
    this.comprobacion = 'No';
    this.capturedPhoto = '';
  }

  async submitForm() {
    localStorage.removeItem('modifyEmployee');

    this.isSubmitted = true;
    if (!this.employeeForm.valid) {
      console.log('Please provide all the required values!');
      return;
    } else {
      let blob = null;
      if (this.capturedPhoto != '' && this.comprobacion == 'No') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      console.log(this.comprobacion);

      this.employeeService
        .updateEmployee(
          this.employee.employee_id,
          {
            name: this.employeeForm.value.name,
            last_names: this.employeeForm.value.last_name,
            email: this.employeeForm.value.email,
            comprobar: this.comprobacion,
          },
          blob
        )
        .subscribe((employee) => {
          this.personalInfoService
            .updatePersonalInfo(this.employee.employee_id, {
              direction: this.employeeForm.value.direction,
              phone: this.employeeForm.value.tlf,
            })
            .subscribe((personalInfo) => {
              console.log(personalInfo);
            });
          this.employmentInfoService
            .updateEmploymentInfo(this.employee.employee_id, {
              booth: this.employeeForm.value.booth,
              salary: this.employeeForm.value.salary,
            })
            .subscribe((employmentInfo) => {
              console.log(employmentInfo);
            });
        });
    }
    await this.sleep(500);
    this.router.navigateByUrl('/list-employee');
  }
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
