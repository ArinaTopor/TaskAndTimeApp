import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const sessionInfo: string | null = localStorage.getItem('session');
    if (!sessionInfo) {
        router.navigate(['auth']);
    }

    return !!sessionInfo;
};
