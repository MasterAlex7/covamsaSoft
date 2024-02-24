import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadoresComponent } from './cotizadores.component';

describe('CotizadoresComponent', () => {
  let component: CotizadoresComponent;
  let fixture: ComponentFixture<CotizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
