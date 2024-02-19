import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TornilleriaComponent } from './tornilleria.component';

describe('TornilleriaComponent', () => {
  let component: TornilleriaComponent;
  let fixture: ComponentFixture<TornilleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TornilleriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TornilleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
