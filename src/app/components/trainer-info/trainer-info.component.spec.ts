import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerInfoComponent } from './trainer-info.component';

describe('TrainerInfoComponent', () => {
  let component: TrainerInfoComponent;
  let fixture: ComponentFixture<TrainerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
