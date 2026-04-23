import {CommonModule} from '@angular/common';
import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MutantAnalysis} from './mutant/models/mutant-analysis';
import {MutantDetectorService} from './mutant/services/mutant-detector.service';
import {SequenceDetectorService} from './mutant/services/sequence-detector.service';


const ADN_EJEMPLO = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly mutantDetectorService = inject(MutantDetectorService);
  private readonly sequenceDetectorService = inject(SequenceDetectorService);

  protected readonly titulo = 'Detector de ADN Mutante';
  protected readonly grillaAdn = signal(this.crearGrillaDesdeAdn(ADN_EJEMPLO));
  protected readonly analisis = signal<MutantAnalysis | null>(null);
  protected readonly mensajeError = signal('');
  protected readonly celdasResaltadas = signal<Set<string>>(new Set());
  protected readonly filas = computed(() => this.grillaAdn());

  protected analizarAdn(): void {
    this.mensajeError.set('');
    this.analisis.set(null);
    this.celdasResaltadas.set(new Set());

    if (!this.grillaEstaCompleta()) {
      this.mensajeError.set('Debes completar toda la matriz usando solo A, T, C o G.');
      return;
    }

    const adn = this.obtenerAdnDesdeGrilla();
    const resultado = this.mutantDetectorService.analizar(adn);
    const posiciones = this.sequenceDetectorService.obtenerPosicionesDeSecuencias(adn);

    this.analisis.set(resultado);
    this.celdasResaltadas.set(new Set(posiciones));
  }

  protected actualizarCelda(fila: number, columna: number, valor: string): void {
    const valorNormalizado = valor.toUpperCase().slice(-1);
    const nuevaGrilla = this.grillaAdn().map((filaActual) => [...filaActual]);

    if (valorNormalizado !== '' && !['A', 'T', 'C', 'G'].includes(valorNormalizado)) {
      this.mensajeError.set('Solo se permiten las letras A, T, C y G.');
      return;
    }

    nuevaGrilla[fila][columna] = valorNormalizado;
    this.grillaAdn.set(nuevaGrilla);
    this.analisis.set(null);
    this.celdasResaltadas.set(new Set());

    if (valorNormalizado === '' && this.mensajeError() === 'Solo se permiten las letras A, T, C y G.') {
      this.mensajeError.set('');
      return;
    }

    this.mensajeError.set('');
  }

  protected esCeldaResaltada(fila: number, columna: number): boolean {
    return this.celdasResaltadas().has(`${fila}-${columna}`);
  }

  private obtenerAdnDesdeGrilla(): string[] {
    return this.grillaAdn().map((fila) => fila.join(''));
  }

  private grillaEstaCompleta(): boolean {
    return this.grillaAdn().every((fila) => fila.every((celda) => celda.length === 1));
  }

  private crearGrillaDesdeAdn(adn: string[]): string[][] {
    return adn.map((fila) => fila.split(''));
  }

}
