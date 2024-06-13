import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

// guardian de ruta, lo que hace es proteger la ruta del dashboard, no podemos ingresar al dashboard si no estas logeado
export const AuthGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const authService = inject(AuthService); //nueva manera de injectar en vez de constructor
    const router = inject(Router); //nueva manera de injectar en vez de constructor

    authService.isLoggedIn || router.navigate(["login"]);

    return true;
  };
