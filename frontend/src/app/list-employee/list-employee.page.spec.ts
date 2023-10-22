import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEmployeePage } from './list-employee.page';

describe('ListEmployeePage', () => {
  let component: ListEmployeePage;
  let fixture: ComponentFixture<ListEmployeePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
