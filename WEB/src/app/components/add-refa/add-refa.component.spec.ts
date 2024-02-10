import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefaComponent } from './add-refa.component';

describe('AddRefaComponent', () => {
  let component: AddRefaComponent;
  let fixture: ComponentFixture<AddRefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
