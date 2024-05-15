import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'delete-element-notification',
    templateUrl: './modal-for-delete.component.html',
    styleUrl: './modal-for-delete.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalForDeleteComponent {
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
        observer.complete();
        this.confirm.emit();
    }
}
