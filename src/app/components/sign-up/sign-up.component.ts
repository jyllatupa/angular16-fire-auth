import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private _authService: AuthService){}

  signUp(email: string, password: string){
    this._authService.signUpWithEmailAndPassword(email, password);
  }
}
