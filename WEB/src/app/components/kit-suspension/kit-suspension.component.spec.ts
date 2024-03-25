import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitSuspensionComponent } from './kit-suspension.component';

describe('KitSuspensionComponent', () => {
  let component: KitSuspensionComponent;
  let fixture: ComponentFixture<KitSuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitSuspensionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
