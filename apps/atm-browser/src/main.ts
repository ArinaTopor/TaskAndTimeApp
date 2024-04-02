import { AppModule } from './app/app.web.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
