import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/components/pokemon/Pokemon';
import { Trainer } from 'src/app/models/trainer.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TrainerPageService } from 'src/app/services/trainer-page.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {


 

  get loading(): boolean{
    return this.trainerPageService.loading;
  }

  get error(): string{
    return this.trainerPageService.error;
  }

  get trainer() {
    return this.trainerService.trainer;
  }

  get favourites(){
    //this.trainerPageService.favorites;
    return this.favoriteService.favouritePokemons;
  }

  

  constructor(
    private readonly trainerPageService: TrainerPageService,
    private readonly trainerService: TrainerService,
    private readonly favoriteService:FavoriteService
  ) { }

  ngOnInit(): void {
    this.trainerPageService.trainerFavorites();
    this.favoriteService.favouritePokemons;
    this.favourites;
  }
  

}
