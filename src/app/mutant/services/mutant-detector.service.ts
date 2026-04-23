import { Injectable } from '@angular/core';

import { MutantAnalysis } from '../models/mutant-analysis';
import { SequenceDetectorService } from './sequence-detector.service';

@Injectable({
  providedIn: 'root'
})
export class MutantDetectorService {
  private static readonly COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE = 2;

  constructor(
    private readonly sequenceDetectorService: SequenceDetectorService
  ) {}

  analizar(adn: string[]): MutantAnalysis {
    const coincidenciasEncontradas = this.sequenceDetectorService.contarSecuenciasRepetidas(
      adn,
      MutantDetectorService.COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE
    );

    return {
      adn,
      esMutante:
        coincidenciasEncontradas >=
        MutantDetectorService.COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE,
      coincidenciasEncontradas,
      tamanoMatriz: adn.length
    };
  }

  esMutante(adn: string[]): boolean {
    return this.analizar(adn).esMutante;
  }
}
