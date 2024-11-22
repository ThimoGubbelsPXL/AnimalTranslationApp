import { Routes } from '@angular/router';
import { TranslateTextComponent } from './core/translate-text/translate-text.component';

export const routes: Routes = [
    {path: 'translate', component: TranslateTextComponent},
    {path: '', redirectTo: 'translate', pathMatch: 'full'}];
