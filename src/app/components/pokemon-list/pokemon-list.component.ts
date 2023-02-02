import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  constructor(private readonly pokemonService:PokemonService){}
  ShowMorePokemons():void{
    this.pokemonService.fetchPokemons();
  }
  ShowLessPokemons():void{
    this.pokemonService.hidePokemons();
  }

  get onlyFirstSet():boolean{
    return this.pokemonService.onlyFirstSet;
  }

@Input() pokemons:Pokemon[] = []; 
}
