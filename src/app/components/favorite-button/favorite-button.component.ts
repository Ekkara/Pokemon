import { Component, Input, OnInit } from '@angular/core';
import { RemovePokemonService } from 'src/app/services/remove-pokemon.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TrainerPageService } from 'src/app/services/trainer-page.service';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { StorageUtil } from 'src/app/utils/storage.utils';
import { StorageKeys } from 'src/app/enum/storage-keys.enum';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit{

  @Input() pokemonName= "";
  @Input() pokemon:Pokemon|undefined;
  

  constructor(
    private readonly removeService: RemovePokemonService,
    private readonly trainerPageService: TrainerPageService,
    private readonly pokemonServices:PokemonService,
    private readonly trainerService: TrainerService
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
          StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, response);
          this.trainerService.trainer = response

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
          StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, response);
          this.trainerService.trainer = response
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
