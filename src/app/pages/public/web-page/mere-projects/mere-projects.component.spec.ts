import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MereProjectsComponent } from './mere-projects.component';

describe('MereProjectsComponent', () => {
  let component: MereProjectsComponent;
  let fixture: ComponentFixture<MereProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MereProjectsComponent]
    });
    fixture = TestBed.createComponent(MereProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
