import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(
    private readonly pokemonService:PokemonService){}

  title = 'ng-pokemon';

  ngOnInit(): void {

    this.pokemonService.babben();
  }  
}
