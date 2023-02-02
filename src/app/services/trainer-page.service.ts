import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const{apiTrainers} = environment

@Injectable({
  providedIn: 'root'
})
export class TrainerPageService {

  private _favorites: Trainer[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  
  
  get favorites(): Trainer[] {
    return this._favorites;
  }

  get error(): string{
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }
  
  


  constructor( private readonly http: HttpClient) { }

  public trainerFavorites(): void{
    this._loading = true;
    this.http.get<Trainer[]>(apiTrainers)
    .pipe(
      finalize(() =>{
        this._loading = false;
      })
    )
    .subscribe({
      next: (favorites: Trainer[]) => {
        this._favorites = favorites;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }


}
