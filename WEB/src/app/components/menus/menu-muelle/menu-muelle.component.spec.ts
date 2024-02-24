import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMuelleComponent } from './menu-muelle.component';

describe('MenuMuelleComponent', () => {
  let component: MenuMuelleComponent;
  let fixture: ComponentFixture<MenuMuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMuelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
