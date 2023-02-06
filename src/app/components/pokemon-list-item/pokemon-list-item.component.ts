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
  isImgLoaded:boolean = false;
  // doesImageExist():boolean{
  //   console.log("S");

  //   const http = new XMLHttpRequest();
  //   http.open('HEAD',"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.pokemon.id+".png" , false);
  //   http.send();  
  //   return http.status != 404;
  // }


  //change the state of to display more information or not 
  getDetails():void{
    this.showingDetails = !this.showingDetails;
    this.pokemonService.fetchDetails(this.pokemon.url, this.pokemon);
  }
  showingDetails:boolean = false;
}
