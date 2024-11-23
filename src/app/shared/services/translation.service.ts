// FILE: translation.service.ts
import { Injectable } from '@angular/core';
import { Language } from '../models/language.model';
import { Mens, Labrador, Poedel, Parkiet, Papegaai } from '../models/languages';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  languages: Language[] = [
    new Mens(),
    new Labrador(),
    new Poedel(),
    new Parkiet(),
    new Papegaai()
  ];

  getLanguages(): string[] {
    return this.languages.slice(0, this.languages.length - 1).map(language => language.name);
  }
  getLanguageInstance(languageName: string): Language {
    return this.languages.find(language => language.name === languageName) as Language;
  }

  getTranslationLanguages(originalLanguage: string): string[] {
    //Only show languages that are translatable to
    if (originalLanguage === 'detect') {
      return this.languages.slice(1, this.languages.length).map(language => language.name);
    }
    //Find the language object that matches the original language
    let language = this.languages.find(lang => lang.name === originalLanguage);
    return language ? language.translationLanguages : [];
  }

  translateText(animalText: string, translateLanguage: string, originalLanguage: string, drunkMode: boolean): string {
    if (originalLanguage === 'detect') {
      originalLanguage = this.detectLanguage(animalText);
    }
    let language = this.languages.find(lang => lang.name === translateLanguage);
    if (language === undefined) {
      return 'Language not found';
    } else {
      if (this.checkIfTranslationIsPossible(translateLanguage, originalLanguage)) {
        return 'Translation not possible';
      }
      let text: string = language.translateText(animalText);
      text = drunkMode ? this.drunkTranslate(text) : text;
      return language.formatTranslatedText(text);
    }
  }

  checkIfTranslationIsPossible(translateLanguage: string, originalLanguage: string): boolean {
    let language = this.languages.find(lang => lang.name === originalLanguage);
    return language?.translationLanguages.find(lang => lang === translateLanguage) === undefined;
  }


  detectLanguage(animalText: string): string {
    const words = animalText.split(' ').map(word => word.trim().toLowerCase());
    let translatableLanguages = this.languages.slice(0, this.languages.length - 1)
    // Detection for animal languages that can be translated
    for (const language of translatableLanguages) {
      const validWord = language.translationText.toLowerCase();
      if (words.every(word => word === validWord)) {
        return language.name;
      }
    }

    // Basic detection for Dutch
    const dutchWords = ['de', 'het', 'een', 'en', 'van', 'ik', 'je', 'dat', 'niet', 'op'];
    if (words.some(word => dutchWords.includes(word))) {
      return 'Mens';
    }

    return 'Unknown';
  }

  drunkTranslate(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/);
    const drunkSentences = sentences.map(sentence => {
      const words = sentence.split(' ');
      const drunkWords = words.map((word, index) => {
        if ((index + 1) % 4 === 0) {
          return word.split('').reverse().join('');
        }
        return word;
      });
      return drunkWords.join(' ');
    });

    const drunkText = drunkSentences.join(' Proost! ');
    return `${drunkText} Burp!`;
  }

}