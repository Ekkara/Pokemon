import { Component, Input } from '@angular/core';
import { DetailedPokemon, Pokemon } from '../pokemon/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {
 constructor(private readonly pokemonService:PokemonService) {}

  @Input() pokemon!:Pokemon;

  getDetails():void{
    this.showDetails = !this.showDetails;
    this.pokemonService.fetchDetails(this.pokemon.url, this.pokemon);
  }
  showDetails:boolean = false;

}
