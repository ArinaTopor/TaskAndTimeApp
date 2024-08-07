import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'delete-element-notification',
    templateUrl: './delete-modal.component.html',
    styleUrl: './delete-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {
    @Input() public isOpen: boolean = false;
    @Output() public confirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() public cancel: EventEmitter<void> = new EventEmitter<void>();
    /**
     * method for close modal
     */
    public onCancel(): void {
        this.isOpen = false;
        this.cancel.emit();
    }

    /**
     * method for delete element
     */
    public onConfirm(observer: any): void {
        this.confirm.emit();
        observer.complete();
    }
}
