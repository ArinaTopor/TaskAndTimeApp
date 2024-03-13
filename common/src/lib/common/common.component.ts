import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'atm-project-common',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './common.component.html',
    styleUrl: './common.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonComponent {}
