import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    // Es el path que define para colocar todo el
    // módulo de autenticación
    // loadChildren, se dispara la función cuando alguien
    // entra a /auth
    path: 'auth',
    // Esto es una promesa
    // Cuando alguien entra al path:auth, carga sus hijos,
    //Esos hijos vienen del producto auth.module
    //Cuando se cargue en memoria, entonces el modulo que va a
    // regresar es el authModule
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    //Si puede cargar el módulo y cuantos guards queremos en arreglo
    //Se envia el nombre del guard
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
