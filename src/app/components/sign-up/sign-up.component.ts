import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {passwordMatchValidator} from "../../shared/password-match.directive";
import {LoggerService} from "../../services/logger/logger.service";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {SignInUser} from "../../interfaces/sign-in";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    NgIf
  ],
  providers: [
    MessageService
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  private loggerService: LoggerService = inject(LoggerService);
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
    const userData = { ...this.signupForm.value };
    delete userData.confirmPassword;
    this.authService.register({email: userData.email, password: userData.password} as SignInUser).subscribe({
      next: (res:any)=>{
        if(res.data) {
          this.loggerService.log('signup Success');
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signup successful' });
          this.authService.setAllToken(res.data.token, res.data.user.uid, "");
          this.router.navigateByUrl('/todolist/');
        } else {
          this.authService.setAllToken("", "", "");
          this.loggerService.error(res.message);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      },
      error: (error) => {
        this.authService.setAllToken("", "", "");
        this.loggerService.error(JSON.stringify(error));
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    });

  }

}
