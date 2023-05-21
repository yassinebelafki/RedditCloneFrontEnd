import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoLoginComponent } from './compo-login.component';

describe('CompoLoginComponent', () => {
  let component: CompoLoginComponent;
  let fixture: ComponentFixture<CompoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompoLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
