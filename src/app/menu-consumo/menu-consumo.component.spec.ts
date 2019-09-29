import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConsumoComponent } from './menu-consumo.component';

describe('MenuConsumoComponent', () => {
  let component: MenuConsumoComponent;
  let fixture: ComponentFixture<MenuConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
