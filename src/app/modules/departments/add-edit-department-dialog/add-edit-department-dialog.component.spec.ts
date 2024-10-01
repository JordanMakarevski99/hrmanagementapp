import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDepartmentDialogComponent } from './add-edit-department-dialog.component';

describe('AddEditDepartmentDialogComponent', () => {
  let component: AddEditDepartmentDialogComponent;
  let fixture: ComponentFixture<AddEditDepartmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDepartmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
