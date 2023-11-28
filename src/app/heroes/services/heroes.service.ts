import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // Manda a llamar la variable del archivo environment.ts
  // Verificar que la importación sea environment.ts y no de prod
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    // Regresa un observable
    // return, accede al observable a donde sea que sea llamado.
    //cuando se este trabajando el bit de producción si toma la variable de prod
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    // POST- Crea un objeto completo
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    if (!heroe.id) throw Error('Heroe id is required');

    return this.http.patch<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string): Observable<boolean> {
    // regresa un objeto vacío o un error, pero existe
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        //Si sucede un error es que no existe el objeto
        //Va a buscar of de jrx y regresa un nuevo observable con el valor de false que significaría que no se borró
        catchError(err => of(false)),
        // Obtiene el valor de la respuesta, la transforma a un true
        map(resp => true)
      );
  }
}
