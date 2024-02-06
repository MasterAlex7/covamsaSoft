import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuellesComponent } from './muelles.component';

describe('MuellesComponent', () => {
  let component: MuellesComponent;
  let fixture: ComponentFixture<MuellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuellesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
