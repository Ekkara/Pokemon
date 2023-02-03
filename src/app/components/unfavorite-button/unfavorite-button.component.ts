import { Component, Input, OnInit } from '@angular/core';
import { RemovePokemonService } from 'src/app/services/remove-pokemon.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TrainerPageService } from 'src/app/services/trainer-page.service';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
@Component({
  selector: 'app-unfavorite-button',
  templateUrl: './unfavorite-button.component.html',
  styleUrls: ['./unfavorite-button.component.css']
})
export class UnfavoriteButtonComponent  implements OnInit{

  @Input() pokemonName= "";
  @Input() pokemon:Pokemon|undefined;
  

  constructor(
    private readonly removeService: RemovePokemonService,
    private readonly trainerPageService: TrainerPageService,
    private readonly pokemonServices:PokemonService
  ) { }
    ngOnInit(): void {
      this.isFavourite = this.pokemonServices.inFavourites(this.pokemonName);
  }
  isFavourite: boolean = false;

  onFavoriteClick():void{
    if(!confirm("do you wish to add " + this.pokemonName + " to favorite?")) return;
    alert("favorite pokemon " + this.pokemonName)
    
    this.removeService.addFavorite(this.pokemonName)
      .subscribe({
        next: (response: any) => {
          console.log("next ", response)
          this.trainerPageService.trainerFavorites()
          this.isFavourite = this.pokemonServices.inFavourites(this.pokemonName);
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
  }

  onUnFavoriteClick(): void {
    alert("unfavorite pokemon " + this.pokemonName) 

    this.removeService.removeFavorite(this.pokemonName)
      .subscribe({
        next: (response: any) => {
          console.log("next ", response)
          this.trainerPageService.trainerFavorites()
         this.pokemonServices.removeFavouritePokemon(this.pokemonName);
         this.isFavourite = this.pokemonServices.inFavourites(this.pokemonName);
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
  }
}
