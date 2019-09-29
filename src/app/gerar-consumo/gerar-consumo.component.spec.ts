import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarConsumoComponent } from './gerar-consumo.component';

describe('GerarConsumoComponent', () => {
  let component: GerarConsumoComponent;
  let fixture: ComponentFixture<GerarConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerarConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
