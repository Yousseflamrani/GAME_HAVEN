import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuUpdateComponent } from './jeu-update.component';

describe('JeuUpdateComponent', () => {
  let component: JeuUpdateComponent;
  let fixture: ComponentFixture<JeuUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JeuUpdateComponent]
    });
    fixture = TestBed.createComponent(JeuUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
