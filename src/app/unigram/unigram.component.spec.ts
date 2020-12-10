import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnigramComponent } from './unigram.component';

describe('UnigramComponent', () => {
  let component: UnigramComponent;
  let fixture: ComponentFixture<UnigramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnigramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
