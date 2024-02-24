import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRefaccionesComponent } from './menu-refacciones.component';

describe('MenuRefaccionesComponent', () => {
  let component: MenuRefaccionesComponent;
  let fixture: ComponentFixture<MenuRefaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRefaccionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuRefaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
