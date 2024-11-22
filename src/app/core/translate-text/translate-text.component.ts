import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { TranslationService } from '../../shared/services/translation.service';


@Component({
  selector: 'app-translate-text',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatCard, MatLabel, MatInput, MatError, MatOption, MatSelect, MatButtonModule,

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
    animalText: ['', { vValidators: Validators.required, updateOn: 'submit' }],
    originalLanguage: [''],
    translateLanguage: ['']
  });


  constructor() {
    this.translateForm.get('originalLanguage')?.valueChanges.subscribe((selectedLanguage) => {
      this.updateTranslationLanguages(selectedLanguage);
    });
  }

  updateTranslationLanguages(selectedLanguage: string) {
    // Logic to update available translation languages based on the selected original language
    this.availableTranslationLanguages = this.translationService.getTranslationLanguages(selectedLanguage);
    this.translateForm.get('translateLanguage')?.setValue('');
  }

  onTranslate() {
    if (this.translateForm.valid) {
      this.translatedText = this.translationService.translateText(
        this.translateForm.value.animalText,
        this.translateForm.value.originalLanguage,
        this.translateForm.value.translateLanguage
      );
    } else {
      console.log('Form is invalid');
    }
  }
}