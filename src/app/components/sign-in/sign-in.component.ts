import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { HttpService } from '../../../services/http-service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { System } from '../../../shared/system';
import { AuthService } from '../../../services/auth-service';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-sign-in',
  imports: [
    ButtonModule,
    IftaLabelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    HttpClientModule,
    IconFieldModule,
    InputIconModule,
    InputGroupAddonModule,
    InputGroupModule,
    CheckboxModule,
    DividerModule,
    MessageModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [HttpService],
})
export class SignInComponent {
  signInForm!: FormGroup;
  loading: boolean = false;
  visible = signal(false);
  error: string = '';
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private system: System,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [''],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }

    this.loading = true;
    /* this.http.post<any>('http://localhost:3000/dev/buildMain', this.signUpForm.value).subscribe((result)=>{
      console.log(result)
    }); */

    this.httpService
      .post('buildLogin', this.signInForm.value)
      .then((result: any) => {
        if (result.message === 'Login Success') {
          // Store token and update login state
          console.log('Login successful:', result);
          this.authService.login(result);
          this.loading = false;
          this.authService.profile = result
          // Debug: log the role
            console.log('User role:', result.role?.trim());
          if (result.role && result.role.toLowerCase() === 'seller') {
            console.log('Navigating to seller dashboard');
            this.system.navigateTo('/seller');
          } else {
            this.system.navigateTo('/');
          }
        }
        console.log(result);
      })
      .catch((err: any) => {
        console.log('Error');
        console.error(err.message);
        this.loading = false;
        this.signInForm.reset();
        this.error = err.error.message;
        this.visible.set(true);

        setTimeout(() => {
          this.visible.set(false);
        }, 3500);
      });
  }

  navigateToSignUp() {
    this.system.navigateTo('/sign-up');
  }
}
