import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerPageService } from 'src/app/services/trainer-page.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {


  get favorites(){
    return this.trainerPageService.favoriteArray();
  }

  get loading(): boolean{
    return this.trainerPageService.loading;
  }

  get error(): string{
    return this.trainerPageService.error;
  }

  get trainer() {
    return this.trainerService.trainer;
  }

  get favoriteArray(){
    return this.trainerPageService.favoriteArray();
  }

  constructor(
    private readonly trainerPageService: TrainerPageService,
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.trainerPageService.trainerFavorites();
  }
  

}
