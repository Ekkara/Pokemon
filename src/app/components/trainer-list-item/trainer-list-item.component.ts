import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerPageService } from 'src/app/services/trainer-page.service';

@Component({
  selector: 'app-trainer-list-item',
  templateUrl: './trainer-list-item.component.html',
  styleUrls: ['./trainer-list-item.component.css']
})
export class TrainerListItemComponent {

 @Input() favorite:string[]= this.trainerPageService.favoriteArray();
 
constructor(
  private readonly trainerPageService: TrainerPageService
){ }
}
 


