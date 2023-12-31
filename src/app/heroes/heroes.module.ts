import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroeTarjetaComponent } from './components/heroe-tarjeta/heroe-tarjeta.component';
import { imagenPipe } from './pipes/imagen.pipe';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [

    AgregarComponent,
    BuscarComponent,
    ConfirmarComponent,
    HeroeComponent,
    HeroeTarjetaComponent,
    HomeComponent,
    imagenPipe,
    ListadoComponent,

  ],
  imports: [
    CommonModule,
    // Habilita el ngModel
    FormsModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
