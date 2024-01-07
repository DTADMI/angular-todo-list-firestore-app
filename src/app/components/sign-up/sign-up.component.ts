import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {passwordMatchValidator} from "../../shared/password-match.directive";
import {LoggerService} from "../../services/logger/logger.service";
import {SignInUser} from "../../interfaces/sign-in";
import {LoadingComponent} from "../loading/loading.component";
import {LoaderService} from "../../services/loader/loader.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LoadingComponent
  ],
  providers: [
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private loggerService: LoggerService = inject(LoggerService);
  private loaderService: LoaderService = inject(LoaderService);
  signupForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
  }, {
    validators: passwordMatchValidator
  });


  get name() {
    return this.signupForm.controls['name'];
  }

  get email() {
    return this.signupForm.controls['email'];
  }

  get password() {
    return this.signupForm.controls['password'];
  }

  get confirmPassword() {
    return this.signupForm.controls['confirmPassword'];
  }

  signup(){
    this.loaderService.showLoader();
    const userData = { ...this.signupForm.value };
    delete userData.confirmPassword;
    this.authService.register({email: userData.email, password: userData.password} as SignInUser).subscribe({
      next: (res:any)=>{
        if(res.data) {
          this.loggerService.log('signup Success');
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
