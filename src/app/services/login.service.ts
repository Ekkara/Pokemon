import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of, finalize } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { PokemonService } from './pokemon.service';
import { FavoriteService } from './favorite.service';


const {apiTrainers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient,
    private readonly favoriteService:FavoriteService) { }

  public login(username: string): Observable<Trainer>{
    return this.checkUsername(username)
      .pipe(
        switchMap((trainer: Trainer | undefined)=>{
          if (trainer === undefined){
            return this.createUser(username);
          }
          this.favoriteService.setFavourite(trainer.pokemon);
          return of(trainer);
        })
      )

  }

  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      map((response: Trainer[])=>response.pop()),
      )
  }

  private createUser(username: string): Observable<Trainer>{

    const trainer = {
      username,
      pokemon: []
    };
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<Trainer>(apiTrainers, trainer, {
      headers
    })
  }
}
