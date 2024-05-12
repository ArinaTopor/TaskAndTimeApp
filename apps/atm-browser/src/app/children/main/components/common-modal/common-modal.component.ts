import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'common-modal',
    templateUrl: './common-modal.component.html',
    styleUrl: './common-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonModalComponent {
    @Input() public title: string = '';
    public value?: string;
    public isOpen: boolean = true;
}
