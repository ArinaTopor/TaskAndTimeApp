import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { RouterModule } from '@angular/router';
import {
    TuiAlertModule,
    TuiDialogModule,
    TuiRootModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TuiRootModule,
        RouterModule.forRoot(appRoutes),
        TuiDialogModule,
        TuiAlertModule,
        CommonModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        CommonModule,
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyAgAlk3tyWHmm2J0eXaGAGlyJlbPvtFD9Q',
            authDomain: 'timeandtaskapp.firebaseapp.com',
            projectId: 'timeandtaskapp',
            storageBucket: 'timeandtaskapp.appspot.com',
            messagingSenderId: '958256097591',
            appId: '1:958256097591:web:2e7391740a7db1ea2d12b2',
        }),
    ],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
