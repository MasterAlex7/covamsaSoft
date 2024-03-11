import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRelacionHerraComponent } from './nueva-relacion-herra.component';

describe('NuevaRelacionHerraComponent', () => {
  let component: NuevaRelacionHerraComponent;
  let fixture: ComponentFixture<NuevaRelacionHerraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaRelacionHerraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaRelacionHerraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
