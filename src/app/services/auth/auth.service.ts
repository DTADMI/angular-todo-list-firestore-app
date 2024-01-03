import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInUser} from "../../interfaces/sign-in";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {SessionStorageService} from "angular-web-storage";
import {LoggerService} from "../logger/logger.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private sessionStorageService: SessionStorageService = inject(SessionStorageService);
  private loggerService: LoggerService = inject(LoggerService);
  private router: Router = inject(Router);

  userIdTokenSig = signal<string>("");
  csrfTokenSig = signal<string>("");

  generateCsrfToken(){
    return this.http.get<{csrfToken: string}>(environment.authServerUrl + '/csrfToken', {withCredentials: true});
  }

  register(user: SignInUser){
    return this.http.post(environment.authServerUrl + '/register', user, {withCredentials: true});
  }

  login(user: SignInUser){
    return this.http.post(environment.authServerUrl + '/login', user, {withCredentials: true});
  }

  logout(){
    this.http.post(environment.authServerUrl + '/logout', null, { withCredentials: true, responseType: "text"}).subscribe({
      next: (message: string) =>{
        this.loggerService.log(message);
        this.setAllToken("","","");
        this.sessionStorageService.clear();
        this.router.navigate(['signin']);
      },
      error: (error) =>{
        this.loggerService.error(`Error while logging out : ${JSON.stringify(error)}`)
      }
    });
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
