import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-trainer-list-item',
  templateUrl: './trainer-list-item.component.html',
  styleUrls: ['./trainer-list-item.component.css']
})
export class TrainerListItemComponent {

 @Input() favorite?: Trainer;

}
