import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { EmploymentInfoService } from '../services/employment-info.service';
import { PersonalInfoService } from '../services/personal-info.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  employeeForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: any = '';

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
  }

  get errorControl() {
    return this.employeeForm.controls;
  }

  takePhoto() {
    this.photoService.takePhoto().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.employeeForm.valid) {
      console.log('Please provide all the required values!');
      return;
    } else {
      let blob = null;
      if (this.capturedPhoto != '') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.employeeService
        .createEmployee(
          {
            name: this.employeeForm.value.name,
            last_name: this.employeeForm.value.last_name,
            email: this.employeeForm.value.email,
          },
          blob
        )
        .subscribe((employee) => {
          this.personalInfoService
            .createPersonalInfo({
              name: this.employeeForm.value.name,
              direction: this.employeeForm.value.direction,
              phone: this.employeeForm.value.tlf,
            })
            .subscribe((personalInfo) => {});
          this.employmentInfoService
            .createEmploymentInfo({
              name: this.employeeForm.value.name,
              booth: this.employeeForm.value.booth,
              salary: this.employeeForm.value.salary,
            })
            .subscribe((employmentInfo) => {});
          this.router.navigateByUrl('/list-employee');
        });
    }
  }
}
