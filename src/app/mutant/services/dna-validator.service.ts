import { Injectable } from '@angular/core';

import { DnaValidationError } from '../errors/dna-validation.error';

@Injectable({
  providedIn: 'root'
})
export class DnaValidatorService {
  private static readonly BASES_NITROGENADAS_PERMITIDAS = /^[ATCG]+$/;

  validar(adn: string[]): string[] {
    if (!Array.isArray(adn) || adn.length === 0) {
      throw new DnaValidationError('Debe ingresar al menos una fila de ADN.');
    }

    const adnSanitizado = adn.map((fila) => fila.trim().toUpperCase()).filter(Boolean);

    if (adnSanitizado.length === 0) {
      throw new DnaValidationError('El ADN no puede estar vacio.');
    }

    const tamanoMatriz = adnSanitizado.length;

    adnSanitizado.forEach((fila, indice) => {
      if (fila.length !== tamanoMatriz) {
        throw new DnaValidationError(
          `La fila ${indice + 1} debe tener exactamente ${tamanoMatriz} caracteres.`
        );
      }

      if (!DnaValidatorService.BASES_NITROGENADAS_PERMITIDAS.test(fila)) {
        throw new DnaValidationError(
          `La fila ${indice + 1} contiene caracteres invalidos. Solo se permiten A, T, C y G.`
        );
      }
    });

    return adnSanitizado;
  }
}
