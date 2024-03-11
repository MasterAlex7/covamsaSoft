import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionHerramientaComponent } from './relacion-herramienta.component';

describe('RelacionHerramientaComponent', () => {
  let component: RelacionHerramientaComponent;
  let fixture: ComponentFixture<RelacionHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacionHerramientaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelacionHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
