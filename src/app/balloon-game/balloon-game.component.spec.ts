import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalloonGameComponent } from './balloon-game.component';

describe('BalloonGameComponent', () => {
  let component: BalloonGameComponent;
  let fixture: ComponentFixture<BalloonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalloonGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalloonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
