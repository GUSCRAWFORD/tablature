import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablatureViewComponent } from './tablature-view.component';

describe('TablatureViewComponent', () => {
  let component: TablatureViewComponent;
  let fixture: ComponentFixture<TablatureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablatureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablatureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
