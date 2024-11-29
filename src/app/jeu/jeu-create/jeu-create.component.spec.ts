import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuCreateComponent } from './jeu-create.component';

describe('JeuCreateComponent', () => {
  let component: JeuCreateComponent;
  let fixture: ComponentFixture<JeuCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JeuCreateComponent]
    });
    fixture = TestBed.createComponent(JeuCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
