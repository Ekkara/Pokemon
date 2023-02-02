import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, finalize } from 'rxjs';
import { DetailedPokemon, Pokemon } from '../components/pokemon/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  readonly interval: number = 10;
  private names: string[] = [];

  private _pokemons: Pokemon[] = [];
  public get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  public get onlyFirstSet(): boolean {
    return this._pokemons.length > this.interval;
  }

  public fetchPokemons(): void {
    this.http
      .get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.interval}&offset=${this._pokemons.length}`
      )
      .pipe(
        map((response: PokemonResponse) => {
          return response.results;
        })
      )
      .subscribe({
        next: (pokemon: Pokemon[]) => {
          pokemon.forEach((p) => {
            let newPokemon: Pokemon = {
              name: p.name,
              url: p.url,
              details:  null
            };
            this._pokemons.push(newPokemon);
          });
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }

  public fetchDetails(url:string):void{
    let returnValue:DetailedPokemon | null = null;
    this.http
    .get<DetailedPokemon>(url)
    .pipe(
      map((response: DetailedPokemon) => {     
        return response;
      }),
    )    
    .subscribe({
      next: (details: DetailedPokemon) => {        
        returnValue = {
          id: details.id,
          height: details.height,
          weight: details.height,
          base_experience: details.base_experience
        };
        this._pokemons[returnValue.id - 1].details = returnValue; //plz don't comment on this TODO: define a better index management system :)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        return null;
      },
    });
  }

  public hidePokemons(): void {
    for (let i = 0; i < this.interval; i++) {
      this._pokemons.pop();
    }
  }
}

//base, used to fetch all pokemons quickly
interface PokemonResponse {
  results: Pokemon[];
}

