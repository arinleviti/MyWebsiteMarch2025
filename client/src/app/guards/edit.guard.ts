import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const editGuard: CanActivateFn = (route, state) => {
  var router = inject(Router);
  if (sessionStorage.getItem('editAuth') === 'true') {
  return true;}
  router.navigate(['/auth']);
  return false;
};
