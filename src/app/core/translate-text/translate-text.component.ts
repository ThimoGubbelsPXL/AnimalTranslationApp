import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { TranslationService } from '../../shared/services/translation.service';
import { Language } from '../../shared/models/language.model';


@Component({
  selector: 'app-translate-text',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatCardContent, MatCard, MatLabel, MatInput, MatError, MatOption, MatSelect, MatButtonModule,

  ],
  templateUrl: './translate-text.component.html',
  styleUrls: ['./translate-text.component.css']
})
export class TranslateTextComponent {
  translationService: TranslationService = inject(TranslationService);
  fb: FormBuilder = inject(FormBuilder);

  translatedText: string = '';
  languages: string[] = this.translationService.getLanguages();
  availableTranslationLanguages: string[] = [];


  translateForm: FormGroup = this.fb.group({
    animalText: ['', { validators: Validators.required, updateOn: 'submit' }],
    originalLanguage: ['detect', Validators.required],
    translateLanguage: ['', Validators.required]
  }, { validators: this.languageTextValidator(), updateOn: 'submit' });


  constructor() {
    this.translateForm.get('originalLanguage')?.valueChanges.subscribe((selectedLanguage) => {
      this.updateTranslationLanguages(selectedLanguage);
    });
    this.updateTranslationLanguages(this.translateForm.value.originalLanguage);
  }

  updateTranslationLanguages(selectedLanguage: string) {
    // Logic to update available translation languages based on the selected original language
    this.availableTranslationLanguages = this.translationService.getTranslationLanguages(selectedLanguage);
    this.translateForm.get('translateLanguage')?.setValue(this.availableTranslationLanguages[0]);
  }

  onTranslate(): void {
    if (this.translateForm.valid) {
      const animalText = this.translateForm.value.animalText;
      const translateLanguage = this.translateForm.value.translateLanguage;
      const originalLanguage = this.translateForm.value.originalLanguage;

      this.translatedText = this.translationService.translateText(animalText, translateLanguage, originalLanguage);
    } else {
      console.log('Form is invalid');
    }
  }

   languageTextValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const animalText = formGroup.get('animalText')?.value?.trim();
      const originalLanguage = formGroup.get('originalLanguage')?.value;
  
      if (!animalText || !originalLanguage) {
        return null; // Don't validate if either value is missing
      }
  
      const languageInstance: Language = this.translationService.getLanguageInstance(originalLanguage);
      if (languageInstance && !languageInstance.validateInput(animalText)) {
        this.translateForm.get('animalText')?.setErrors({ invalidLanguageText: true });
        return { invalidLanguageText: true };
      }
      return null;
    };
  }


  

  
}