import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInUser} from "../../interfaces/sign-in";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  accessTokenSig = signal<string>("");
  userIdSig = signal<string>("");
  accessToken$$:BehaviorSubject<string> = new BehaviorSubject<string>("");
  userId$$:BehaviorSubject<string> = new BehaviorSubject<string>("");


  register(user: SignInUser){
    return this.http.post(environment.authServerUrl + '/register', user);
  }

  login(user: SignInUser){
    return this.http.post(environment.authServerUrl + '/login', user);
  }

  logout(){
    this.accessToken$$.next("");
    this.accessTokenSig.set("");
    this.userId$$.next("");
    this.userIdSig.set("");
    this.router.navigateByUrl('/signin');
  }
}
