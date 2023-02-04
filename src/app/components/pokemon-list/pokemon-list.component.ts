import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
@Input() pokemons:Pokemon[] = []; 
}
