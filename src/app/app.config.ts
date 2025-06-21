import { ApplicationConfig, provideZoneChangeDetection, isDevMode, APP_INITIALIZER, APP_BOOTSTRAP_LISTENER, provideExperimentalZonelessChangeDetection } from '@angular/core';
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


export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideIonicAngular({}),
    provideHttpClient(),
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
    provideFirebaseApp(() => initializeApp({

      apiKey: "AIzaSyDJQzTUBzQrHmYC6ityy-dSavxQHqHtgWw",
      authDomain: "pro-max-aad84.firebaseapp.com",
      projectId: "pro-max-aad84",
      storageBucket: "pro-max-aad84.appspot.com",
      messagingSenderId: "611180821912",
      appId: "1:611180821912:web:5bbb0e2121feb58f44ffed",
      measurementId: "G-6EDS59FTQB"

    })),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())]
};
