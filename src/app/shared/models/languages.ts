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

  override translateText(text: string): string {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return text.split(' ').map(word => {
      return vowels.includes(word.toLowerCase()) ? 'tjilp' : 'piep';
    }).join(' ');
  }

  override formatTranslatedText(translatedText: string): string {
    const words: string[] = translatedText.split(' ');
    let formattedText = '';
    for (let i = 0; i < words.length; i++) {
      formattedText += `<span>${words[i]}</span> `;
      if ((i + 1) % 10 === 0) {
        formattedText += '<br>';
      }
    }
    return `<span class="parkiet">${formattedText.trim()}</span>`;
  }

  override validateInput(inputText: string): boolean {
    const validWords = ['tjilp', 'piep'];
    const words = inputText.split(' ').map(word => word.trim().toLowerCase());
    return words.every(word => validWords.includes(word));
  }
}

export class Papegaai extends Language {
  constructor() {
    super('Papegaai', [''], 'test');
  }

  override translateText(text: string): string {
    // Make sure another sentence follows with words in it.
    const sentences = text.split(/(?<=[.!?])\s+/).filter(sentence => sentence.trim().length > 0);
    return sentences.map(sentence => {
      return `Ik praat je na: ${sentence.trim()}`;
    }).join(' ');
  }

  override formatTranslatedText(translatedText: string): string {
    const colors = ['red', 'green', 'yellow', 'blue'];
    return `<span class="papegaai">${translatedText.split(/(?<=[.!?])\s+/).map(sentence => {
      const words = sentence.trim().split(' ').map((word, index) => {
        const coloredWord = `<span style="color: ${colors[index % 4]}">${word}</span>`;
        return coloredWord;
      }).join(' ');
      return `${words}<br>`;
    }).join('')}</span>`;
  }
}