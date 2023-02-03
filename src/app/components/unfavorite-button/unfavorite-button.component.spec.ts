import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfavoriteButtonComponent } from './unfavorite-button.component';

describe('UnfavoriteButtonComponent', () => {
  let component: UnfavoriteButtonComponent;
  let fixture: ComponentFixture<UnfavoriteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfavoriteButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfavoriteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
