// FILE: mens.language.ts
import { Language } from './language.model';

export class Mens extends Language {
  constructor() {
    super('Mens', ['Labrador', 'Poedel', 'Parkiet', 'Papegaai'], '');
  }
}



export class Labrador extends Language {
  constructor() {
    super('Labrador', ['Poedel', 'Papegaai'], 'woef');
  }
}


export class Poedel extends Language {
  constructor() {
    super('Poedel', ['Labrador', 'Papegaai'], 'woefie');
  }
}


export class Parkiet extends Language {
  constructor() {
    super('Parkiet', ['Papegaai', 'Labrador'], '');
  }
}



export class Papegaai extends Language {
  constructor() {
    super('Papegaai', [''], 'test');
  }
}