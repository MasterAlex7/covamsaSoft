import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioLigeroComponent } from './servicio-ligero.component';

describe('ServicioLigeroComponent', () => {
  let component: ServicioLigeroComponent;
  let fixture: ComponentFixture<ServicioLigeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioLigeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioLigeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
