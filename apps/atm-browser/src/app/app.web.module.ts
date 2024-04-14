import { NgModule, importProvidersFrom } from '@angular/core';
import { AppComponent } from './components/app.component';
import { RouterModule } from '@angular/router';
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiDialogModule,
    TuiRootModule,
    TuiTextfieldControllerModule,
    tuiSvgOptionsProvider,
} from '@taiga-ui/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import {
    BrowserAnimationsModule,
    provideAnimations,
} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonLoadingComponent } from './modules/loader/skeleton.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { environment } from '../enviroment/envoronment';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

@NgModule({
    imports: [
        BrowserModule,
        NgxSkeletonLoaderModule.forRoot(),
        NxWelcomeComponent,
        RouterModule.forRoot(appRoutes),
        TuiRootModule,
        RouterModule.forRoot(appRoutes),
        TuiDialogModule,
        TuiAlertModule,
        CommonModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        BrowserAnimationsModule,
        NgOptimizedImage,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [
        provideAnimations(),
        importProvidersFrom(TuiRootModule),
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer,
        },
        tuiSvgOptionsProvider({
            path: 'https://taiga-ui.dev/assets/taiga-ui/icons',
        }),
    ],
    declarations: [AppComponent, SkeletonLoadingComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
