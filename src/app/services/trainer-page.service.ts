import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { TrainerService } from './trainer.service';


const{apiFavorites, apiTrainers} = environment

@Injectable({
  providedIn: 'root'
})
export class TrainerPageService {

  private _error: string = "";
  private _loading: boolean = false;

 

  //

  
  

  get error(): string{
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }
  
  


  constructor(
    private readonly trainerService: TrainerService, 
    private readonly http: HttpClient) { }

  public trainerFavorites(): void{

    if(!this.trainerService.trainer){
      throw new Error("trainerFavorites: there is no user")
    }
    const trainerId: number= this.trainerService.trainer?.id;
    this._loading = true;
    this.http.get<Trainer[]>(apiFavorites + trainerId)
    .pipe(
      finalize(() =>{
        this._loading = false;
      })
    )
    .subscribe({
      next: (favorites: Trainer[]) => {
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}
