import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInUser} from "../../interfaces/sign-in";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {SessionStorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private sessionStorageService: SessionStorageService = inject(SessionStorageService);
  private router: Router = inject(Router);

  userIdTokenSig = signal<string>("");
  csrfTokenSig = signal<string>("");

  generateCsrfToken(){
    return this.http.get(environment.authServerUrl + '/csrfToken', {withCredentials: true});
  }

  register(user: SignInUser){
    return this.http.post(environment.authServerUrl + '/register', user, {withCredentials: true});
  }

  login(user: SignInUser){
    return this.http.post(environment.authServerUrl + '/login', user, {withCredentials: true});
  }

  logout(){
    this.http.post(environment.authServerUrl + '/logout', {}, {withCredentials: true}).subscribe(() =>{
      this.setAllToken("","","");
      this.router.navigateByUrl('/signin/');
    })
  }

  setAllToken(accessToken: string, userId: string, csrfToken: string) {
    this.sessionStorageService.set("accessToken", accessToken, 1, "h");
    this.userIdTokenSig.set(userId);
    this.csrfTokenSig.set(csrfToken);
  }

  setCsrfToken(csrfToken: string) {
    this.csrfTokenSig.set(csrfToken);
  }

  setAccessToken(accessToken: string) {
    this.sessionStorageService.set("accessToken", accessToken, 1, "h");
  }

  setUserId(userId: string) {
    this.userIdTokenSig.set(userId);
  }

  getCsrfToken() {
    return this.csrfTokenSig();
  }


  getAccessToken() {
    return this.sessionStorageService.get("accessToken");
  }

  getUserId() {
    return this.userIdTokenSig();
  }

  clearAllToken(){
    this.sessionStorageService.clear();
  }

  clearAccessToken(){
    this.sessionStorageService.remove("accessToken");
  }

  clearUserId(){
    this.userIdTokenSig.set("");
  }

  clearCsrfToken(){
    this.csrfTokenSig.set("");
  }
}
