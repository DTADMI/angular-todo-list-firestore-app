import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {SignInUser} from "../../interfaces/sign-in";
import {LoggerService} from "../../services/logger/logger.service";
import {LoadingComponent} from "../loading/loading.component";
import {LoaderService} from "../../services/loader/loader.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LoadingComponent
  ],
  providers: [
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private loggerService: LoggerService = inject(LoggerService);
  private loaderService: LoaderService = inject(LoaderService);
  signinForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });

  get email() {
    return this.signinForm.controls['email'];
  }
  get password() { return this.signinForm.controls['password']; }

  signin(){
    this.loaderService.showLoader();
    const { email, password } = this.signinForm.value;
    this.authService.login({email, password} as SignInUser).subscribe({
      next: (res:any)=>{
        if(res.data) {
          this.loggerService.log('login Success');
          this.authService.setAllToken(res.data.token, res.data.user.uid, "");
          this.router.navigateByUrl(this.authService.getRedirectUrl());
        } else {
          this.authService.setAllToken("", "", "");
          this.loggerService.error(res.message);
        }
      },
      error: (error) => {
        this.authService.setAllToken("", "", "");
        this.loggerService.error(JSON.stringify(error));
      },
      complete: () => {
        this.loaderService.hideLoader();
      }
    });
  }
}
