import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SequenceDetectorService {
  private static readonly LONGITUD_SECUENCIA_REQUERIDA = 4;
  private static readonly DIRECCIONES = [
    { pasoFila: 0, pasoColumna: 1 },
    { pasoFila: 1, pasoColumna: 0 },
    { pasoFila: 1, pasoColumna: 1 },
    { pasoFila: 1, pasoColumna: -1 }
  ];

  contarSecuenciasRepetidas(adn: string[], detenerEn = Number.MAX_SAFE_INTEGER): number {
    let coincidencias = 0;

    for (let fila = 0; fila < adn.length; fila += 1) {
      for (let columna = 0; columna < adn[fila].length; columna += 1) {
        const baseActual = adn[fila][columna];

        for (const direccion of SequenceDetectorService.DIRECCIONES) {
          if (!this.puedeIniciarSecuencia(adn, fila, columna, direccion.pasoFila, direccion.pasoColumna)) {
            continue;
          }

          if (this.tieneSecuenciaRepetida(adn, fila, columna, direccion.pasoFila, direccion.pasoColumna, baseActual)) {
            coincidencias += 1;

            if (coincidencias >= detenerEn) {
              return coincidencias;
            }
          }
        }
      }
    }

    return coincidencias;
  }

  obtenerPosicionesDeSecuencias(adn: string[], detenerEn = Number.MAX_SAFE_INTEGER): string[] {
    const posiciones = new Set<string>();
    let coincidencias = 0;

    for (let fila = 0; fila < adn.length; fila += 1) {
      for (let columna = 0; columna < adn[fila].length; columna += 1) {
        const baseActual = adn[fila][columna];

        for (const direccion of SequenceDetectorService.DIRECCIONES) {
          if (!this.puedeIniciarSecuencia(adn, fila, columna, direccion.pasoFila, direccion.pasoColumna)) {
            continue;
          }

          if (this.tieneSecuenciaRepetida(adn, fila, columna, direccion.pasoFila, direccion.pasoColumna, baseActual)) {
            coincidencias += 1;
            this.registrarPosiciones(posiciones, fila, columna, direccion.pasoFila, direccion.pasoColumna);

            if (coincidencias >= detenerEn) {
              return [...posiciones];
            }
          }
        }
      }
    }

    return [...posiciones];
  }

  private puedeIniciarSecuencia(
    adn: string[],
    fila: number,
    columna: number,
    pasoFila: number,
    pasoColumna: number
  ): boolean {
    const ultimaFila = fila + (SequenceDetectorService.LONGITUD_SECUENCIA_REQUERIDA - 1) * pasoFila;
    const ultimaColumna =
      columna + (SequenceDetectorService.LONGITUD_SECUENCIA_REQUERIDA - 1) * pasoColumna;

    if (!this.estaDentroDeLaMatriz(adn, ultimaFila, ultimaColumna)) {
      return false;
    }

    const filaAnterior = fila - pasoFila;
    const columnaAnterior = columna - pasoColumna;

    if (!this.estaDentroDeLaMatriz(adn, filaAnterior, columnaAnterior)) {
      return true;
    }

    return adn[filaAnterior][columnaAnterior] !== adn[fila][columna];
  }

  private tieneSecuenciaRepetida(
    adn: string[],
    fila: number,
    columna: number,
    pasoFila: number,
    pasoColumna: number,
    baseEsperada: string
  ): boolean {
    for (
      let desplazamiento = 1;
      desplazamiento < SequenceDetectorService.LONGITUD_SECUENCIA_REQUERIDA;
      desplazamiento += 1
    ) {
      const siguienteFila = fila + desplazamiento * pasoFila;
      const siguienteColumna = columna + desplazamiento * pasoColumna;

      if (adn[siguienteFila][siguienteColumna] !== baseEsperada) {
        return false;
      }
    }

    return true;
  }

  private registrarPosiciones(
    posiciones: Set<string>,
    fila: number,
    columna: number,
    pasoFila: number,
    pasoColumna: number
  ): void {
    for (
      let desplazamiento = 0;
      desplazamiento < SequenceDetectorService.LONGITUD_SECUENCIA_REQUERIDA;
      desplazamiento += 1
    ) {
      const siguienteFila = fila + desplazamiento * pasoFila;
      const siguienteColumna = columna + desplazamiento * pasoColumna;

      posiciones.add(`${siguienteFila}-${siguienteColumna}`);
    }
  }

  private estaDentroDeLaMatriz(adn: string[], fila: number, columna: number): boolean {
    return fila >= 0 && fila < adn.length && columna >= 0 && columna < adn.length;
  }
}
