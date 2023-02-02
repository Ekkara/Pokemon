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

  private _pokemons:Pokemon[] = [];
  public get pokemons(): Pokemon[]{
    return this._pokemons;
  }

  public fetchPokemons():void {
    //this.names = [];
    this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${this.interval}&offset=${this._pokemons.length}`)
    .pipe(
      map((response: PokemonResponse) => {
        return response.results;
      })
    )
    .subscribe({
      next: (pokemon: Result[]) => {
        pokemon.forEach(p=>{
         //old way
          //currentArr.push(p);
          
          //new way
         let nPokemon:Pokemon = {
          name: p.name,
          details: null
         }
         this._pokemons.push(nPokemon);
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    }) 
  }
}
  //base, used to fetch all pokemons quickly
  interface PokemonResponse {
    results: Result[];
  }
   interface Result {
    name: string;
    url: string;
  }
