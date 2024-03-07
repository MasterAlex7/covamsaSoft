import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTorComponent } from './add-tor.component';

describe('AddTorComponent', () => {
  let component: AddTorComponent;
  let fixture: ComponentFixture<AddTorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
