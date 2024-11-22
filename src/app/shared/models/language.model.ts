// FILE: language.model.ts
export abstract class Language {
    name: string;
    translationLanguages: string[];
    translationText: string;
  
    constructor(name: string, translationLanguages: string[], translationText: string) {
      this.name = name;
      this.translationLanguages = translationLanguages;
      this.translationText = translationText;
    }
  
    translateText(animalText: string): string {
        return animalText.split(' ').map(() => this.translationText).join(' ');
      }
  }