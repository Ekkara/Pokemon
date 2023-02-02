import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon/Pokemon';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {
  @Input() pokemon!:Pokemon;
}
