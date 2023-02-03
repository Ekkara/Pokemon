import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Trainer } from '../models/trainer.model';
import { TrainerPageService } from './trainer-page.service';
import { TrainerService } from './trainer.service';

const {apiKey, apiTrainers} =environment

@Injectable({
  providedIn: 'root'
})
export class RemovePokemonService {



  constructor(
    private readonly http: HttpClient,
    private readonly trainerPageService: TrainerPageService,
    private readonly trainerService: TrainerService
    ) { }

    public removeFavorite(id: string): Observable<any>{
      if (!this.trainerService.trainer){
        throw new Error("removeFavorite There is no trainer")
      }
      
      const trainer: Trainer = this.trainerService.trainer;
      //filter out pokemon we want to delete
      const newPokemons=trainer.pokemon.filter(e => e !== id)
     

      const headers = new HttpHeaders({
        'content-type': 'application/json',
        'x-api-key': apiKey
      })

      return this.http.patch(`${apiTrainers}/${trainer.id}`,{
        //push pokemons without selected
        pokemon: [ ...newPokemons]
      }, {
        headers
      })
    }

}
