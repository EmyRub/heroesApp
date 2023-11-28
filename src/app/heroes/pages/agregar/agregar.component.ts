import { Component } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
        width: 100%;
        border-radius: 5px;
      }
  `]
})
export class AgregarComponent {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },

  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor(private HeroesService: HeroesService,
    //Lee la url
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.Router.url.includes('editar')) {
      return;
    }
    //Verificar el id de la url
    this.ActivatedRoute.params
      .pipe(
        switchMap(({ id }) => this.HeroesService.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);

  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.HeroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnakbar('Registro Actualizado'));
    } else {
      // crear
      this.HeroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.Router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnakbar('Registro Creado');
        })
    }
  }

  borrarHeroe() {
    //Recibe como argumento un componente
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    //Es un observable
    dialog.afterClosed().subscribe(
      (result) => {

        if (result) {
          this.HeroesService.borrarHeroe(this.heroe.id!)
            //Para que se dispare el evento
            .subscribe(resp => {
              this.Router.navigate(['/heroes']);
            })
        }
      }
    )
  }

  mostrarSnakbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
