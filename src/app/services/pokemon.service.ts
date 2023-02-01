import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Pokemon } from '../components/pokemon/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  private readonly _pokemons$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  //https://pokeapi.co/api/v2/pokemon/pikachu
  
  readonly amount:number = 10;

  public fetchPokemons(offset: number): void {
    this.http.get<string[]>(`https://pokeapi.co/api/v2/pokemon?limit=${this.amount}&offset=${offset}`)
    .pipe(
      map((response: string[]) => {
        return response;
      })
    )
    .subscribe({
      next: (jokes: string[]) => {
        this._pokemons$.next(jokes)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })    
  }

  public babben(): void {
      this.fetchPokemons(20);
      console.log(this._pokemons$)
  }

}

export interface Pokemons{
  pokemon: Pokemon[]
}

