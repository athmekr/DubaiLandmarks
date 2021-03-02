import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkDetailedComponent } from './landmark-detailed.component';

describe('LandmarkDetailedComponent', () => {
  let component: LandmarkDetailedComponent;
  let fixture: ComponentFixture<LandmarkDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
