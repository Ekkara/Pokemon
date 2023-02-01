import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit{

  constructor(private readonly pokemonService: PokemonService){}

  ngOnInit(): void {
    //initiate first fetch NB fetch every time visiting the page, 
    //TODO: avoid that!
      this.pokemonService.fetchPokemons(0);
  }
}
