import { Injectable, NgZone } from "@angular/core";
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { GoogleAuthProvider } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ){
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      }else{
        localStorage.setItem('user', 'null');
      }
    })
  }

  //metodo para logearse con email and password
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      this.userData = userCredential.user
      this.observeUserState()
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  //metodo para logearse con google
  logInWithGoogleProvider(){
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
    .then(() => this.observeUserState())
    .catch((error) => {
      alert(error.message);
    })
  }

  // metodo para registrarse con email and password
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      this.userData = userCredential.user
      this.observeUserState()
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  observeUserState(){
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
    })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Logout
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}
