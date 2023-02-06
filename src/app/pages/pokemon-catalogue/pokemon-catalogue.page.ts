import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css'],
})
export class PokemonCataloguePage implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}

  ShowMorePokemons(): void {
    this.pokemonService.fetchPokemons();
  }
  ShowLessPokemons(): void {
    this.pokemonService.hidePokemons();
  }

  get onlyFirstSet(): boolean {
    return this.pokemonService.onlyFirstSet;
  }

  public get pokemons(): Pokemon[] {
    return this.pokemonService.pokemons;
  }

  ngOnInit(): void {
    //initiate first fetch
    if (this.pokemons.length !== 0) return;
    this.pokemonService.fetchPokemons();   
  }
}
