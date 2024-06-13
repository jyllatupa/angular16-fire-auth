import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _authService: AuthService){}

  logIn(email: string, password: string){
    this._authService.logInWithEmailAndPassword(email, password);
  }

  logInWithGoogle(){
    this._authService.logInWithGoogleProvider();
  }
}
