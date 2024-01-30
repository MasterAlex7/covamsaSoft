import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPesadoComponent } from './servicio-pesado.component';

describe('ServicioPesadoComponent', () => {
  let component: ServicioPesadoComponent;
  let fixture: ComponentFixture<ServicioPesadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioPesadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioPesadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
