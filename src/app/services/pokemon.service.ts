import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { DetailedPokemon, Pokemon } from '../models/Pokemon';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}
 
  readonly interval: number = 10;

  private _pokemons: Pokemon[] = [];
  public get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  public get onlyFirstSet(): boolean {
    return this._pokemons.length > this.interval;
  }

  //fetch pokemons from poki api, the amount of "interval" every click
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
              id: this.idFromUrl(p.url),
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
  //extract the id from their url
  private idFromUrl(url:string):number{
    return parseInt(url.split('/').at(-2)!.substring(0, url.length - 4));
  }

  //return details to a pokemon which requested it
  public fetchDetails(url:string, pokemon:Pokemon):void{
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
      pokemon.details = returnValue;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        return null;
      },
    });
  }

  //remove interval amount of pokemons from the catalogue
  public hidePokemons(): void {
    for (let i = 0; i < this.interval; i++) {
      this._pokemons.pop();
    }
  }

  //look if pokemon exist within the catalogue list
  public find(name:string):Pokemon|null{
    for(let i:number = 0; i < this._pokemons.length; i++){
      if(this._pokemons[i].name === name){
        return this._pokemons[i];
      }
    }
    alert("no pokemon with the name " + name +" was found");
    return null;
  }
}

//respond from fetching all the pokemons
interface PokemonResponse {
  results: Pokemon[];
}

