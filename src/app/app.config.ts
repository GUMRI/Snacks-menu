import { ApplicationConfig, provideZoneChangeDetection, isDevMode, APP_BOOTSTRAP_LISTENER, provideExperimentalZonelessChangeDetection, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';
import { initDatabase } from './core/local-first/services/db.service';
import { environment } from '../environments/environment.development';


export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideIonicAngular({}),
    provideHttpClient(),
    provideAppInitializer(initDatabase),
    provideTranslocoLocale({
      langToLocaleMapping: {
        en: 'en-US',
        ar: 'ar-TN',
        fr: 'fr-TN'
      },
      localeToCurrencyMapping: {
        'en-US': 'TND',
        'ar-TN': 'TND',
        'fr-TN': 'TND'
      },
      defaultLocale: 'en-US',
      defaultCurrency: 'TND',
      localeConfig: {
        global: {
          currency: { currency: 'TND' },
          date: {
            dateStyle: 'long',
            timeStyle: 'short'
          }
        }
      }
    }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ar', 'fr'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())]
};
