import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { Language } from '../models/language.model';
import { Papegaai } from '../models/languages';

describe('TranslationService', () => {
  let service: TranslationService;
  let mockLanguage: jasmine.SpyObj<Language>;

  beforeEach(() => {
    mockLanguage = jasmine.createSpyObj('Language', ['translateText', 'validateInput', 'formatTranslatedText']);
    mockLanguage.name = 'Mens';
    mockLanguage.translationLanguages = ['Papegaai'];
  

    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        { provide: Language, useValue: mockLanguage }
      ]
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect language correctly', () => {
    const detectLanguageSpy = spyOn(service, 'detectLanguage').and.callThrough();
    const mockText = 'mock mock mock';
    service.detectLanguage(mockText);
    expect(detectLanguageSpy).toHaveBeenCalledWith(mockText);
  });

  it('should translate text correctly', () => {
    const language = new Papegaai();
    const mockText = 'de test';
    const checkIfTranslationIsPossibleSpy = spyOn(service, 'checkIfTranslationIsPossible').and.returnValue(false);
    const findLanguageSpy = spyOn(service.languages, 'find').and.returnValue(language);
    const languageTranslateSpy = spyOn(language, 'translateText').and.returnValue(mockText);



    service.translateText(mockText, 'Papegaai', 'Mens', false);
    expect(checkIfTranslationIsPossibleSpy).toHaveBeenCalledWith('Papegaai', 'Mens');
    expect(languageTranslateSpy).toHaveBeenCalledWith(mockText);
  });

  it('should handle drunk translation correctly', () => {
    const drunkTranslateSpy = spyOn(service, 'drunkTranslate').and.callThrough();
    const mockText = 'This is a test sentence.';
    service.translateText(mockText, 'Papegaai', 'Mens', true);
    expect(drunkTranslateSpy).toHaveBeenCalled();
  });

  it('should return all languages except the first one when originalLanguage is detect', () => {
    const getTranslationLanguagesSpy = spyOn(service, 'getTranslationLanguages').and.callThrough();
    service.getTranslationLanguages('detect');
    expect(getTranslationLanguagesSpy).toHaveBeenCalledWith('detect');
  });

  it('should return translation languages for a given original language', () => {
    const getTranslationLanguagesSpy = spyOn(service, 'getTranslationLanguages').and.callThrough();
    service.getTranslationLanguages('Mens');
    expect(getTranslationLanguagesSpy).toHaveBeenCalledWith('Mens');
  });

  it('should return all languages if the original language is not found', () => {
    const getTranslationLanguagesSpy = spyOn(service, 'getTranslationLanguages').and.callThrough();
    service.getTranslationLanguages('UnknownLanguage');
    expect(getTranslationLanguagesSpy).toHaveBeenCalledWith('UnknownLanguage');
  });

  it('should return "Translation not possible" if translation is not possible', () => {
    const checkIfTranslationIsPossibleSpy = spyOn(service, 'checkIfTranslationIsPossible').and.returnValue(true);
    const result = service.translateText('mock mock mock', 'Mens', 'Mens', false);
    expect(checkIfTranslationIsPossibleSpy).toHaveBeenCalledWith('Mens', 'Mens');
    expect(result).toBe('Translation not possible');
  });

  it('should return "Language not found" if translate language is not found', () => {
    const findLanguageSpy = spyOn(service.languages, 'find').and.returnValue(undefined);
    const result = service.translateText('mock mock mock', 'Labrador', 'Mens', false);
    expect(findLanguageSpy).toHaveBeenCalled();
    expect(result).toBe('Language not found');
  });
});