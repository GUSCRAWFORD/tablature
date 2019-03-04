import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablatureComponent } from './tablature.component';

describe('TablatureComponent', () => {
  let component: TablatureComponent;
  let fixture: ComponentFixture<TablatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
