import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBAComponent } from './add-ba.component';

describe('AddBAComponent', () => {
  let component: AddBAComponent;
  let fixture: ComponentFixture<AddBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
