import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokemon } from 'src/app/models/Pokemon';
import { Trainer } from '../models/trainer.model';
import { PokemonService } from './pokemon.service';
import { TrainerService } from './trainer.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(
    private readonly http: HttpClient,
    private readonly trainerService: TrainerService,
    private readonly pokemonService: PokemonService
  ) {}

  //variables to change and get favorites locally
  private _favouritePokemons: Pokemon[] = [];
  public get favouritePokemons(): Pokemon[] {
    if (!this.trainerService.trainer) {
      throw new Error('removeFavorite There is no trainer');
    }
    this._favouritePokemons = this.trainerService.trainer.pokemon;
    return this._favouritePokemons;
  }

  addFavouritePokemons(pokemon: Pokemon) {
    this._favouritePokemons.push(pokemon);
  }
  removeFavouritePokemon(pokemonName: string) {
    this._favouritePokemons = this._favouritePokemons.filter(
      (pokemon: Pokemon) => pokemon.name !== pokemonName
    );
  }
  public setFavourite(pokemons: Pokemon[]) {
    this._favouritePokemons = pokemons;
  }
  isInFavourites(name: string | undefined): boolean {
    if (name === undefined) return false;
    return Boolean(
      this.favouritePokemons.find((pokemon: Pokemon) => pokemon.name === name)
    );
  }

  
  public addFavorite(name: string): Observable<any> {
    if (!this.trainerService.trainer) {
      throw new Error('removeFavorite There is no trainer');
    }

    //add pokemon to favorite on client side
    const newPokemon = this.pokemonService.find(name);

    if (newPokemon) {
      this.addFavouritePokemons(newPokemon);
    }

    //add pokemon on the server
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http.patch(
      `${apiTrainers}/${this.trainerService.trainer.id}`,
      {
        pokemon: [...this.favouritePokemons],
      },
      {
        headers,
      }
    );
  }

  public removeFavorite(id: string): Observable<any> {
    if (!this.trainerService.trainer) {
      throw new Error('removeFavorite There is no trainer');
    }

    //remove pokemon on client side by filter it out
    const trainer: Trainer = this.trainerService.trainer;

    const newPokemons = trainer.pokemon.filter(
      (pokemon) => pokemon.name !== id
    );
    this.trainerService.trainer.pokemon = newPokemons;

    //remove the pokemon on the server side
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http.patch(
      `${apiTrainers}/${trainer.id}`,
      {
        //push pokemons without selected
        pokemon: [...newPokemons]
      },
      {
        headers,
      }
    );
  }
}
