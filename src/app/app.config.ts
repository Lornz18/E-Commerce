import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { MyPreset } from '../../mypreset';
import { System } from '../shared/system';

export function initializeSystem(system: System) {
  return () => system.init(); // must return a function
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: MyPreset
            }
        }),
        {
          provide: APP_INITIALIZER,
          useFactory: initializeSystem,
          deps: [System],
          multi: true,
        },
  ]
};
