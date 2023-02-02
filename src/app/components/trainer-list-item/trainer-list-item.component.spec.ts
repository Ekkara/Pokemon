import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerListItemComponent } from './trainer-list-item.component';

describe('TrainerListItemComponent', () => {
  let component: TrainerListItemComponent;
  let fixture: ComponentFixture<TrainerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
