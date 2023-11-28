import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.less']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    // Se importa activatedRoute para leer la url
    private activatedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router) { }

    // Los servicios se activan en ngOnInit
  ngOnInit(): void {

    // .params, accede a los parámetros
    this.activatedRoute.params
    //Dentro del pipe() es donde se pueden especificar cualquier cantidad 
    //de operadores que van a trabajar con el producto de este observable
      .pipe(
        // switchmap.- Transforma el observable que emite el id en el 
        //objeto o en otro observable que regresa el héroe que va a 
        //ser el producto del observable getHeroePorId()
        /* El switchMap recibe lo que el observable(activatedRoute) esta adquiriendo (params), 
        regresa un nuevo observable*/
        //Regresa un nuevo observable, que es el servicio (heroeService)
        switchMap(({ id }) => this.heroeService.getHeroePorId(id)
        )
      )
      .subscribe(heroe => this.heroe = heroe);
    //.subscribe(heroe => {
    // console.log(heroe['id']);
    // })
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }


}
