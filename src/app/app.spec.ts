import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();
  });

  it('deberia crear la aplicacion', () => {
    const fixture = TestBed.createComponent(App);
    const aplicacion = fixture.componentInstance;

    expect(aplicacion).toBeTruthy();
  });

  it('deberia mostrar el titulo principal', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const contenido = fixture.nativeElement as HTMLElement;

    expect(contenido.querySelector('h1')?.textContent).toContain('Detector de ADN Mutante');
  });

  it('deberia mostrar el boton de analisis', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const contenido = fixture.nativeElement as HTMLElement;

    expect(contenido.textContent).toContain('Analizar');
  });
});
