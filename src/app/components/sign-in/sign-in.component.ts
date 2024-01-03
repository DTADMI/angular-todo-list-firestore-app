import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {SignInUser} from "../../interfaces/sign-in";
import {LoggerService} from "../../services/logger/logger.service";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    NgIf,
    ButtonModule,
    RouterLink
  ],
  providers: [
    MessageService
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  private loggerService: LoggerService = inject(LoggerService);
  signinForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });


  get email() {
    return this.signinForm.controls['email'];
  }
  get password() { return this.signinForm.controls['password']; }

  signin(){
    const { email, password } = this.signinForm.value;
    this.authService.login({email, password} as SignInUser).subscribe({
      next: (res:any)=>{
        if(res.data) {
          this.loggerService.log('login Success');
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
          this.authService.setAllToken(res.data.token, res.data.user.uid, "");
          this.router.navigate(['todolist']);
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
