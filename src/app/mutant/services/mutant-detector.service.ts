import { Injectable } from '@angular/core';

import { MutantAnalysis } from '../models/mutant-analysis';
import { DnaValidatorService } from './dna-validator.service';
import { SequenceDetectorService } from './sequence-detector.service';

@Injectable({
  providedIn: 'root'
})
export class MutantDetectorService {
  private static readonly COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE = 2;

  constructor(
    private readonly dnaValidatorService: DnaValidatorService,
    private readonly sequenceDetectorService: SequenceDetectorService
  ) {}

  analizar(adn: string[]): MutantAnalysis {
    const adnValidado = this.dnaValidatorService.validar(adn);
    const coincidenciasEncontradas = this.sequenceDetectorService.contarSecuenciasRepetidas(
      adnValidado,
      MutantDetectorService.COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE
    );

    return {
      adn: adnValidado,
      esMutante:
        coincidenciasEncontradas >=
        MutantDetectorService.COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE,
      coincidenciasEncontradas,
      tamanoMatriz: adnValidado.length
    };
  }

  esMutante(adn: string[]): boolean {
    return this.analizar(adn).esMutante;
  }
}
