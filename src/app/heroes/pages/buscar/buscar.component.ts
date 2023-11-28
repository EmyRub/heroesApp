import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.less']
})
export class BuscarComponent {

  termino: string = '';
  heroes: Heroe[] = [];

  //Petición para traer información del heroe
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    //Válidar si es un string vacío
    if (!event.option.value) {
      // Impide la ejecución del método en caso de no haber heroes
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe);
  }
}
