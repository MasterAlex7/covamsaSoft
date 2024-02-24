import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSPComponent } from './add-sp.component';

describe('AddSPComponent', () => {
  let component: AddSPComponent;
  let fixture: ComponentFixture<AddSPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
