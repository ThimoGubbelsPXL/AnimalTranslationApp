import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  getLanguages(): string[] {
    return ['Mens', 'Labrador', 'Peodel', 'Parkiet', 'Papegaai'];
  }

  getTranslationLanguages(originalLanguage: string): string[] {
    // Logic to return available translation languages based on the original language
    const languagesMap: { [key: string]: string[] } = {
      Mens: ['Labrador', 'Peodel'],
      Labrador: ['Mens', 'Papegaai'],
      Peodel: ['Parkiet', 'Papegaai'],
      Parkiet: ['Mens', 'Labrador'],
      Papegaai: ['Peodel', 'Parkiet']
    };
    return languagesMap[originalLanguage] || [];
  }

  translateText(animalText: string, originalLanguage: string, translateLanguage: string): string {
    // Implement translation logic here
    return `Translated ${animalText} from ${originalLanguage} to ${translateLanguage}`;
  }
}