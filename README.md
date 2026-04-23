# Mutant Detector

Aplicacion Angular para detectar si un humano es mutante a partir de su secuencia de ADN.

## Objetivo

La funcion principal del dominio es equivalente a:

```ts
isMutant(dna: string[]): boolean
```

Un ADN se considera mutante cuando existe mas de una secuencia de 4 letras iguales en direccion horizontal, vertical u oblicua.

## Estructura

- `src/app/mutant/services/dna-validator.service.ts`: valida que el ADN sea NxN y solo contenga `A`, `T`, `C`, `G`.
- `src/app/mutant/services/sequence-detector.service.ts`: recorre la matriz y cuenta secuencias repetidas con salida temprana.
- `src/app/mutant/services/mutant-detector.service.ts`: orquesta el caso de uso y expone `isMutant()`.
- `src/app/app.ts`: coordina la pantalla y delega la logica al dominio.

## Buenas practicas aplicadas

- Responsabilidad unica por clase.
- Componente desacoplado de la regla de negocio.
- Algoritmo O(N^2) con un numero fijo de direcciones.
- Codigo simple, legible y facil de extender.

## Ejecutar proyecto

```bash
npm install
npm start
```

Abrir en el navegador:

```text
http://localhost:4200
```

## Ejecutar pruebas

```bash
npm test
```

## Ejemplo mutante

```ts
const dna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
```
