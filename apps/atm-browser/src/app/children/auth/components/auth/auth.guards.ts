import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const sessionInfo: string | null = localStorage.getItem('session');
    if (sessionInfo) {
        return true;
    } else {
        router.navigate(['auth']);

        return false;
    }
};
