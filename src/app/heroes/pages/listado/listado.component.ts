import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'

})


export class ListadoComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  heroes: Heroe[] = [];

  ngOnInit(): void {

    this.heroesService.getHeroes()
      //se va a tener la respuesta que es un arreglo de heroes, 
      // se debe especificar tipado
      .subscribe(heroes => this.heroes = heroes);
  }
}
