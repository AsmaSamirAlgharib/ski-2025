import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { lastValueFrom } from 'rxjs';
import { InitService } from './core/services/init-service';

function initializeApp(initService: InitService) {
  return () => lastValueFrom(initService.init()).finally(() => {
    const splash = document.getElementById('initial-splash');
    if (splash) {
      splash.remove();
    }
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [InitService]
    }
  ]
};
