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
    return animalText.split(/(\s+|\b|[.,!?])/).map(word => {
      if (word.trim() === '') {
        return word; // Preserve whitespace
      } else if (/[.,!?]/.test(word)) {
        return word; // Preserve punctuation
      } else {
        return this.translationText;
      }
    }).join('');
  }
  formatTranslatedText(translatedText: string): string {
    return `<span class="${this.name.toLowerCase()}">${translatedText}</span>`;
  }
  validateInput(inputText: string): boolean {
    const words = inputText.split(' ').map(word => word.trim().toLowerCase());
    const validWord = this.translationText.toLowerCase();
    return words.every(word => word === validWord);
  }
}