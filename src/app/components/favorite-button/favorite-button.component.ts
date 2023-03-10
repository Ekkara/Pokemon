import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TrainerPageService } from 'src/app/services/trainer-page.service';
import { Pokemon } from 'src/app/models/Pokemon';
import { StorageUtil } from 'src/app/utils/storage.utils';
import { StorageKeys } from 'src/app/enum/storage-keys.enum';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/trainer.model';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() pokemonName = '';
  @Input() pokemon: Pokemon | undefined;

  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly trainerPageService: TrainerPageService,
    private readonly trainerService: TrainerService
  ) {}
  ngOnInit(): void {
    this.isFavourite = this.favoriteService.isInFavourites(this.pokemonName);
  }
  isFavourite: boolean = false;
  loading: boolean = false;

  //function the html can reach, from here the pokemon will either be added or 
  //removed from favorites depending on it's current state 

  onFavoriteClick() {
    if (this.isFavourite) {
      this.removeFromFavorite();
    } else {
      this.addToFavorite();
    }
  }

  addToFavorite(): void {
    if (!confirm('do you wish to add ' + this.pokemonName + ' to favorite?'))
      return;
    alert('favorite pokemon ' + this.pokemonName);

    this.loading = true;
    this.favoriteService.addFavorite(this.pokemonName).subscribe({
      next: (response: any) => {
        StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, response);
        this.trainerService.trainer = response;

        console.log('next ', response);
        this.trainerPageService.trainerFavorites();
        this.isFavourite = this.favoriteService.isInFavourites(
          this.pokemonName
        );
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error.message);
      },
    });
  }

  removeFromFavorite(): void {
    alert('unfavorite pokemon ' + this.pokemonName);

    this.loading = true;

    this.favoriteService.removeFavorite(this.pokemonName).subscribe({
      next: (response: any) => {
        StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, response);
        this.trainerService.trainer = response;
        this.trainerPageService.trainerFavorites();
        this.favoriteService.removeFavouritePokemon(this.pokemonName);
        this.isFavourite = this.favoriteService.isInFavourites(
          this.pokemonName
        );

        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error.message);
      },
    });
  }
}
