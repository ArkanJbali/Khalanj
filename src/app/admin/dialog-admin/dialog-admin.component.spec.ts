import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminComponent } from './dialog-admin.component';

describe('DialogAdminComponent', () => {
  let component: DialogAdminComponent;
  let fixture: ComponentFixture<DialogAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
