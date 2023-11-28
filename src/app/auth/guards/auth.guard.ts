import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );

    //if (this.authService.auth.id) {
    //True permite acceder a la página
    // return true;
    // }
    // console.log('Bloqueado por el AuthGuard - CanActivated');
    // return true;
  }

  // Solo sirve para prevenir que el usuario no cargue el módulo
  //Si ya estaba cargado previamente puede acceder
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

    return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );

    //if (this.authService.auth.id) {
    //True permite acceder a la página
    // return true;
    // }
    // console.log('Bloqueado por el AuthGuard - CanLoad');
      }
      
  }
