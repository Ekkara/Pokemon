import { Component, Input } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-info',
  templateUrl: './trainer-info.component.html',
  styleUrls: ['./trainer-info.component.css']
})
export class TrainerInfoComponent {

constructor( private readonly trainerService: TrainerService) {}

get trainer() {
  return this.trainerService.trainer;
}

get pokemonsRemaining() {
  if(!this.trainer){
    return 1008
  }

  return 1008 - this.trainer.pokemon.length
}


}
