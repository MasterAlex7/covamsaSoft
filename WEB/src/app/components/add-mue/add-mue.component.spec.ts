import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMueComponent } from './add-mue.component';

describe('AddMueComponent', () => {
  let component: AddMueComponent;
  let fixture: ComponentFixture<AddMueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
