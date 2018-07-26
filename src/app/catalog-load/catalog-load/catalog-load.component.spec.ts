import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogLoadComponent } from './catalog-load.component';

describe('CatalogLoadComponent', () => {
  let component: CatalogLoadComponent;
  let fixture: ComponentFixture<CatalogLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
