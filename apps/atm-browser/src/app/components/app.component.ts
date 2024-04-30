import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'atm-project-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class AppComponent implements OnInit {
    public ngOnInit(): void {
        const mode: string | null = localStorage.getItem('mode');
        mode
            ? document.body.classList.add(mode)
            : document.body.classList.add('light');
    }
}
