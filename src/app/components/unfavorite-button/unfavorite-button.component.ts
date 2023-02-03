import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unfavorite-button',
  templateUrl: './unfavorite-button.component.html',
  styleUrls: ['./unfavorite-button.component.css']
})
export class UnfavoriteButtonComponent  implements OnInit{

  @Input() pokemonId= "";

  constructor() { }
  ngOnInit(): void {
    
  }

  onUnFavoriteClick(): void {
    alert("clicked pokemon " + this.pokemonId) 
  }


}
