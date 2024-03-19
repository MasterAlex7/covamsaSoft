import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularPVComponent } from './calcular-pv.component';

describe('CalcularPVComponent', () => {
  let component: CalcularPVComponent;
  let fixture: ComponentFixture<CalcularPVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcularPVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcularPVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
