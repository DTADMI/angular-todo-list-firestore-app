import {computed, inject, Injectable, Signal, signal} from '@angular/core';
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
  isLoggedInSig : Signal<boolean> = computed(() => !!this.userIdTokenSig() && !!this.sessionStorageService.get("accessToken"))
  private redirectUrl: string = "";

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
    return this.http.post(environment.authServerUrl + '/logout', null, { withCredentials: true, responseType: "text"});
  }

  setAllToken(accessToken: string, userId: string, csrfToken: string) {
    this.setAccessToken(accessToken);
    this.setUserId(userId);
    this.setCsrfToken(csrfToken);
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

  getCsrfToken(): string {
    return this.csrfTokenSig();
  }


  getAccessToken(): string {
    return this.sessionStorageService.get("accessToken");
  }

  getUserId(): string {
    return this.userIdTokenSig();
  }

  clearAllToken(){
    this.setAllToken("","","");
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

  isUserLoggedIn() {
    return !!this.getUserId() && !!this.getAccessToken();
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  setRedirectUrl(url: string){
    this.redirectUrl = url;
  }
}
