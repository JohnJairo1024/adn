export class DnaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DnaValidationError';
  }
}
