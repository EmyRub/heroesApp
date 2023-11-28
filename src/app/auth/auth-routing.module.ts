import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';


const routes: Routes = [
  {
    // Va vacío porque el auth-routing es quien indica
    // cual es el módulo que se debe poner abajo
    // Básicamente dice: No me importa que path sea, cuando
    // alguien entre a este módulo entonces ahí es donde se va trabajar
    path: '',
    // Se agregan las hijas
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    // No se agrega forRoot, porque solo debe existir uno en la app (rutas principales)
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
