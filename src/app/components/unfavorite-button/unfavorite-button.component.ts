import { Component, Input, OnInit } from '@angular/core';
import { RemovePokemonService } from 'src/app/services/remove-pokemon.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TrainerPageService } from 'src/app/services/trainer-page.service';
import { TrainerService } from 'src/app/services/trainer.service';
@Component({
  selector: 'app-unfavorite-button',
  templateUrl: './unfavorite-button.component.html',
  styleUrls: ['./unfavorite-button.component.css']
})
export class UnfavoriteButtonComponent  implements OnInit{

  @Input() pokemonId= "";

  get trainer() {
    return this.trainerService.trainer;
  }

  constructor(
    private readonly trainerService: TrainerService,
    private readonly removeService: RemovePokemonService,
    private readonly trainerPageService: TrainerPageService
  ) { }
  ngOnInit(): void {
    
  }

  onUnFavoriteClick(): void {
    alert("clicked pokemon " + this.pokemonId) 
    this.removeService.removeFavorite(this.pokemonId)
      .subscribe({
        next: (response: any) => {
          console.log("next ", response)
          this.trainerPageService.trainerFavorites()
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
      

    
      

  }


}
