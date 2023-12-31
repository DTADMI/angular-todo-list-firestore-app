import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInUser} from "../../interfaces/sign-in";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {CookieOptions, CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private cookieService: CookieService = inject(CookieService);
  private router: Router = inject(Router);

  csrfTokenSig = signal<string>("");
  private expiresIn = 60*60*1*1*1000;
  private cookieOptions: CookieOptions = {
    sameSite: "None",
    secure:true,
    expires: this.expiresIn,
    path: "/",
    domain: "https://darryltadmi-todo-list-angular.web.app/"
  };

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
    this.http.post(environment.authServerUrl + '/logout', {}).subscribe(() =>{
      this.setAllToken("","","","")
      //this.router.navigateByUrl('/signin/');
    })
  }

  setAllToken(accessToken: string, userId: string,sessionToken: string, csrfToken: string) {
    this.cookieService.set("__session", sessionToken, this.cookieOptions);
    this.cookieService.set("accessToken", accessToken, this.cookieOptions);
    this.cookieService.set("userId", userId, this.cookieOptions);
    this.csrfTokenSig.set(csrfToken);
  }

  setCsrfToken(csrfToken: string) {
    this.csrfTokenSig.set(csrfToken);
  }

  setSessionToken(sessionToken: string) {
    this.cookieService.set("__session", sessionToken, this.cookieOptions);
  }

  setAccessToken(accessToken: string) {
    this.cookieService.set("accessToken", accessToken, this.cookieOptions);
  }

  setUserId(userId: string) {
    this.cookieService.set("userId", userId, this.cookieOptions);
  }

  getCsrfToken() {
    return this.csrfTokenSig();
  }

  getSessionToken() {
    return this.cookieService.get("__session");
  }

  getAccessToken() {
    return this.cookieService.get("accessToken");
  }

  getUserId() {
    return this.cookieService.get("userId");
  }
}
