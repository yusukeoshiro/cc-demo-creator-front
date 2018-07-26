import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInitComponent } from './site-init.component';

describe('SiteInitComponent', () => {
  let component: SiteInitComponent;
  let fixture: ComponentFixture<SiteInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
