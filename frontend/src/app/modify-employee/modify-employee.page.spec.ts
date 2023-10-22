import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyEmployeePage } from './modify-employee.page';

describe('ModifyEmployeePage', () => {
  let component: ModifyEmployeePage;
  let fixture: ComponentFixture<ModifyEmployeePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifyEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
