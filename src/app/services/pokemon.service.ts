import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Pokemon } from '../components/pokemon/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}
 
  readonly interval:number = 10;
  private names:string[] = [];

  public fetchPokemons(offset: number): void {
    this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${this.interval}&offset=${offset}`)
    .pipe(
      map((response: PokemonResponse) => {
        return response.results;
      })
    )
    .subscribe({
      next: (pokemon: Result[]) => {
        pokemon.forEach(p=>{
          this.names.push(p.name);
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    }) 
    console.log(this.names);
  }
}
export interface PokemonResponse{
  results: Result[]
}
export interface Result{
  name: string,
  url:string
}

