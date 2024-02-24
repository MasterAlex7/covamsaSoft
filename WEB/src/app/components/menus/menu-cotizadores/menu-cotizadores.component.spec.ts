import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCotizadoresComponent } from './menu-cotizadores.component';

describe('MenuCotizadoresComponent', () => {
  let component: MenuCotizadoresComponent;
  let fixture: ComponentFixture<MenuCotizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCotizadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuCotizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
