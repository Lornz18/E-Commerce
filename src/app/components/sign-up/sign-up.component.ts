import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../services/auth-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../../services/http-service';
import { System } from '../../../shared/system';
@Component({
  selector: 'app-sign-up',
  imports: [CardModule, IftaLabelModule, FormsModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [HttpService]
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  loading: boolean = false

  constructor(private fb: FormBuilder, private http: HttpClient, private httpService: HttpService, private system: System) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;

    this.httpService.post('buildMain', this.signUpForm.value).then((result)=>{
      this.system.navigateTo('/sign-in')
      this.loading = false
    }).catch((console.error));
  }
}
