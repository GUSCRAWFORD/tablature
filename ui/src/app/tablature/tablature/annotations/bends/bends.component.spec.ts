import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BendsComponent } from './bends.component';

describe('BendsComponent', () => {
  let component: BendsComponent;
  let fixture: ComponentFixture<BendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
