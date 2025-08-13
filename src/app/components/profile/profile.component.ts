import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { TabsModule } from 'primeng/tabs';
import { AuthService } from '../../../services/auth-service';
import { System } from '../../../shared/system';
import { Observable } from 'rxjs';

interface SelectOption {
  name: string;
  code?: string; // Optional code property if needed
}

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here
    TabsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    TextareaModule,
    PasswordModule,
    CheckboxModule,
    // AvatarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})

export class ProfileComponent {
  professions: SelectOption[] = [];
  locations: SelectOption[] = [];

  // ngModel bindings for form elements
  selectedProfession: SelectOption | undefined;
  selectedLocation: SelectOption | undefined;

  receiveUpdates: boolean = true; // Matches the checked state in the image
  seeViewers: boolean = false; // Matches the unchecked state in the image
  isLoggedIn!: Observable<any>;

  constructor(private authService: AuthService, private system: System) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogin$;
    if (!this.isLoggedIn) {
      console.log('User is not logged in, redirecting to login page.');
      this.system.navigateTo('/sign-in');
    }

    // Populate dropdown options (dummy data)
    this.professions = [
      { name: 'Software Engineer' },
      { name: 'Product Manager' },
      { name: 'UX Designer' },
      { name: 'Data Scientist' },
      { name: 'Marketing Specialist' },
    ];

    this.locations = [
      { name: 'New York, USA' },
      { name: 'London, UK' },
      { name: 'Berlin, Germany' },
      { name: 'Paris, France' },
      { name: 'Tokyo, Japan' },
    ];

    // Pre-select if needed, e.g., for "-Select your title-" to appear correctly
    // this.selectedProfession = undefined;
    // this.selectedLocation = undefined;
  }
}
