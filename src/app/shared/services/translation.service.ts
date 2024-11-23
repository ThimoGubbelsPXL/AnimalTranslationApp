// FILE: translation.service.ts
import { Injectable } from '@angular/core';
import { Language } from '../models/language.model';
import { Mens, Labrador, Poedel, Parkiet, Papegaai } from '../models/languages';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languages: Language[] = [
    new Mens(),
    new Labrador(),
    new Poedel(),
    new Parkiet(),
    new Papegaai()
  ];

  getLanguages(): string[] {
    return this.languages.slice(0,this.languages.length-1).map(language => language.name);
  }
  getLanguageInstance(languageName: string): Language {
    return this.languages.find(language => language.name === languageName) as Language;
  }

  getTranslationLanguages(originalLanguage: string): string[] {
    //Only show languages that are translatable to
    if(originalLanguage === 'detect') {
      return this.languages.slice(1, this.languages.length).map(language => language.name);
    }
    //Find the language object that matches the original language
    let language = this.languages.find(lang => lang.name === originalLanguage);
    return language ? language.translationLanguages : [];
  }

  translateText(animalText: string, translateLanguage: string, originalLanguage: string): string {
    if(originalLanguage === 'detect') {
      originalLanguage = this.detectLanguage(animalText);
    }

    if (this.checkIfTranslationIsPossible(translateLanguage, originalLanguage)) {
      return 'Translation not possible';
    }
    let language = this.languages.find(lang => lang.name === translateLanguage);
    if (language === undefined) {
      return 'Language not found';
    } else {
      let text: string = language.translateText(animalText);
      return language.formatTranslatedText(text);
    }
  }

  private checkIfTranslationIsPossible(translateLanguage: string, originalLanguage: string): boolean {
    let language = this.languages.find(lang => lang.name === originalLanguage);
    return language?.translationLanguages.find(lang => lang === translateLanguage) === undefined;
  }

  private formatTranslatedText(translatedText: string, translateLanguage: string): string {
    switch (translateLanguage) {
      case 'Labrador':
        return `<span class="labrador">${translatedText}</span>`;
      case 'Poedel':
        return `<span class="poedel">${translatedText}</span>`;
      case 'Parkiet':
        return `<span class="parkiet">${translatedText.split(' ').map(word => `<span>${word}</span>`).join(' ')}</span>`;
      case 'Papegaai':
        return `<span class="papegaai">${translatedText.split(' ').map((word, index) => {
          const colors = ['red', 'green', 'yellow', 'blue'];
          return `<span style="color: ${colors[index % 4]}">${word}&nbsp;</span>`;
        }).join(' ')}</span>`;
      default:
        return translatedText;
    }
  }

  private detectLanguage(animalText: string): string { 
    //Logic to detect the language of the animal text
    return 'Mens';
  }
}