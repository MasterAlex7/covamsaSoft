import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisistornilleriaComponent } from './analisistornilleria.component';

describe('AnalisistornilleriaComponent', () => {
  let component: AnalisistornilleriaComponent;
  let fixture: ComponentFixture<AnalisistornilleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisistornilleriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalisistornilleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
