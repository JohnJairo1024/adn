import {Injectable} from '@angular/core';

import {MutantAnalysis} from '../models/mutant-analysis';
import {SequenceDetectorService} from './sequence-detector.service';

@Injectable({
  providedIn: 'root'
})
export class MutantDetectorService {
  private static readonly COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE = 2;

  constructor(
    private readonly sequenceDetectorService: SequenceDetectorService
  ) {
  }

  analizar(adn: string[]): MutantAnalysis {
    const {COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE} = MutantDetectorService;

    const coincidenciasEncontradas = this.sequenceDetectorService.contarSecuenciasRepetidas(
      adn,
      COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE
    );

    return {
      adn,
      esMutante: coincidenciasEncontradas === COINCIDENCIAS_REQUERIDAS_PARA_SER_MUTANTE,
      coincidenciasEncontradas,
      tamanoMatriz: adn.length
    };
  }

}
