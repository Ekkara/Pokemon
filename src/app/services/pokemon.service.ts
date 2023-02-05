import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, finalize, Observable } from 'rxjs';
import { DetailedPokemon, Pokemon } from '../components/pokemon/Pokemon';
import { environment } from 'src/environments/environment';
import { TrainerService } from './trainer.service';
import { Trainer } from '../models/trainer.model';

const {apiTrainers} = environment

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient,
    private readonly trainerService:TrainerService) {}
 
  readonly interval: number = 10;

  private _pokemons: Pokemon[] = [];
  public get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  public isDirty:boolean = false;
  private _favouritePokemons: Pokemon[] = [];
  public get favouritePokemons(): Pokemon[] {
   
    return this._favouritePokemons;
    //return new api request  
  }
  
  public addFavouritePokemons(pokemon: Pokemon){ 
    this.isDirty = true;
    this._favouritePokemons.push(pokemon);
  }
  public removeFavouritePokemon(pokemonName:string){
    this.isDirty = true;
    this._favouritePokemons = this._favouritePokemons.filter((pokemon: Pokemon) => pokemon.name !== pokemonName);
  }
  public initFavourite(pokemons:Pokemon[]){
    this._favouritePokemons = pokemons;
  }


  public get onlyFirstSet(): boolean {
    return this._pokemons.length > this.interval;
  }

  loadingNewPokemons:boolean = false;
  
  public fetchPokemons(): void {
    if(this.loadingNewPokemons) return;
    this.loadingNewPokemons = true;
    this.http
      .get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.interval}&offset=${this._pokemons.length}`
      )
      .pipe(
        map((response: PokemonResponse) => {
          return response.results;
        }),
        finalize(()=>{
          this.loadingNewPokemons = false;
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
  
  public idFromUrl(url:string):number{
    return parseInt(url.split('/').at(-2)!.substring(0, url.length - 4));
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
  public find(name:string):Pokemon|null{
    for(let i:number = 0; i < this._pokemons.length; i++){
      if(this._pokemons[i].name === name){
        return this._pokemons[i];
      }
    }
    alert("no pokemon with the name " + name +" was found");
    return null;
  }

  public inFavourites(name: string|undefined): boolean{
    if(name === undefined) return false;
    return Boolean(this.favouritePokemons.find((pokemon:Pokemon) => pokemon.name === name));
   }
}

//base, used to fetch all pokemons quickly
interface PokemonResponse {
  results: Pokemon[];
}

