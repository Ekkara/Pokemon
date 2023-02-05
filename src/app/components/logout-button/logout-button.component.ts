import { Component } from '@angular/core';
import { StorageKeys } from 'src/app/enum/storage-keys.enum';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent {
  //if logging out, the local key is removed and refresh the page. With the key 
  //gone this will take the user to the login screen.
  onLogOutClick(): void {
    alert('see you again');
    sessionStorage.removeItem(StorageKeys.Trainer);
    window.location.reload();
  }
}
