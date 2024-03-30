import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule, CommonModule, TuiInputModule, ReactiveFormsModule, TuiTextfieldControllerModule],
    selector: 'atm-project-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }]
})
export class AppComponent {
    protected title: string = 'atm-browser';
    protected readonly testForm: FormGroup = new FormGroup({
        testValue: new FormControl('profit@cool.ru'),
    });
}
