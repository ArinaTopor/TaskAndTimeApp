import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { TuiAlertOptions } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'tui-notifications-service-example-with-custom-label',
    templateUrl: './widget-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertWithCustomLabelComponent {
    constructor(
        @Inject(POLYMORPHEUS_CONTEXT)
        public readonly context: TuiDialog<TuiAlertOptions<unknown>, boolean>
    ) {}
}
