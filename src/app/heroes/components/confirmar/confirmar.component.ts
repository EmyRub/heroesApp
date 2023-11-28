import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.less']
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private dialoRef: MatDialogRef<ConfirmarComponent>,
    //Se lee quien sea el dialogo y la data va a ser almacenada en la propiedad data de tipo heroe
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  borrar() {
    this.dialoRef.close(true);
  }

  cerrar() {
    this.dialoRef.close();
  }

}
