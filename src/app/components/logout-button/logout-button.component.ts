import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enum/storage-keys.enum';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  onLogOutClick(): void {
    alert("see you again")
    sessionStorage.removeItem(StorageKeys.Trainer)
    window.location.reload();
  }

}
