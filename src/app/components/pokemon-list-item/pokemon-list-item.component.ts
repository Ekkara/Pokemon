import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {
 constructor(private readonly pokemonService:PokemonService) {}

  @Input() pokemon!:Pokemon;

  //change the state of to display more information or not 
  getDetails():void{
    this.showingDetails = !this.showingDetails;
    this.pokemonService.fetchDetails(this.pokemon.url, this.pokemon);
  }
  showingDetails:boolean = false;
}
