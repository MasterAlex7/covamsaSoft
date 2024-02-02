import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsasDeAireComponent } from './bolsas-de-aire.component';

describe('BolsasDeAireComponent', () => {
  let component: BolsasDeAireComponent;
  let fixture: ComponentFixture<BolsasDeAireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BolsasDeAireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BolsasDeAireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
