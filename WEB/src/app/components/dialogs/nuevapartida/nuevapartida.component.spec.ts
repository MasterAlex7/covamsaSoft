import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevapartidaComponent } from './nuevapartida.component';

describe('NuevapartidaComponent', () => {
  let component: NuevapartidaComponent;
  let fixture: ComponentFixture<NuevapartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevapartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevapartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
