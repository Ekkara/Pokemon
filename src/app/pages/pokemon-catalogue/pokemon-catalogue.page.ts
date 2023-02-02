import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/components/pokemon/Pokemon';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit{

  constructor(private readonly pokemonService: PokemonService){}

  public get pokemons():Pokemon[]{
    return this.pokemonService.pokemons;
  }

  ngOnInit(): void {
    //initiate first fetch NB fetch every time visiting the page, 
    //TODO: avoid that!

    this.pokemonService.fetchPokemons();
  }
}
